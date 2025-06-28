import os
import dotenv
from pymongo import MongoClient
from flask import Flask, request, jsonify
from rapidfuzz import process
import google.generativeai as genai
from rapidfuzz import fuzz
from unidecode import unidecode
import time
import re
# import tiktoken

dotenv.load_dotenv()
genai.configure(api_key=os.getenv("GEMINI_API_KEY"))
generation_config = genai.GenerationConfig(
    temperature=1,
    top_p=0.95,
    max_output_tokens=1024,
    top_k=40,
    stop_sequences=["\n\n"]
)
gemini_model = genai.GenerativeModel(model_name="gemini-2.5-flash", generation_config=generation_config)

# === KẾT NỐI MONGODB ===
client = MongoClient("mongodb://localhost:27017/")
db = client["eduadvisor"]
collection = db["documents"]

app = Flask(__name__)
chat_history = []

def normalize_text(text):
    text = unidecode(text)
    text = text.lower()
    text = re.sub(r"[^\w\s]", "", text)
    text = re.sub(r"\s+", " ", text).strip()
    return text

def find_intents(question, intent_list, user_info=None, faq_text=None, chat_session=None):
    start = time.time()
    
    prompt = f"""
    Bạn là chuyên gia phân tích ngữ cảnh cho chatbot tại Trung tâm CUSC.
    Dựa trên câu hỏi người dùng, sở thích của họ và lịch sử hội thoại, bạn cần xác định ngữ cảnh phù hợp nhất.
    Dưới đây là thông tin cần thiết:

    Câu hỏi người dùng: "{question}"
    Sở thích của người dùng: {user_info or "(Không có thông tin)"}

    Danh sách ngữ cảnh: {intent_list}

    Hướng dẫn:
    - Nếu câu hỏi này là một phần của lựa chọn được chatbot gợi ý trước đó → xác định intent tương ứng.
    - Nếu người dùng đang hỏi chi tiết một lựa chọn cụ thể → giữ đúng intent đó.
    - Nếu không xác định được nữa  → trả về "no".
    
    Trả về 1 intent liên quan nhất, cách nhau bằng dấu chấm `.`, không giải thích.
    """

    response = chat_session.send_message(prompt)
    print(f"[Time] Find intents took: {time.time() - start} giây")
    return response.text.strip()


# --- LẤY DỮ LIỆU TỪ MONGODB THEO THỨ TỰ ƯU TIÊN METADATA ---
def get_data_from_metadata(intents):
    list_intents = [i.strip() for i in intents.split('.') if i.strip()]
    combined_content = ""

    for intent in list_intents:
        # Ưu tiên tìm kiếm theo domain, subdomain, topic trước
        doc = collection.find_one({"$or": [
            {"domain": intent},
            {"subdomain": intent},
            {"topic": intent},
            {"_intent": intent}
        ]})
        
        if doc and doc.get("content"):
            metadata_info = ""
            if doc.get("domain"):
                metadata_info += f"Domain: {doc['domain']}"
            if doc.get("subdomain"):
                metadata_info += f", Subdomain: {doc['subdomain']}"
            if doc.get("topic"):
                metadata_info += f", Topic: {doc['topic']}"
            if doc.get("_intent"):
                metadata_info += f", Intent: {doc['_intent']}"
            
            combined_content += f"\n--- Ngữ cảnh: ({metadata_info.strip(', ')}) ---\n{doc['content']}\n"
    return combined_content.strip() if combined_content else None


def generate_answer(question, context, user_info=None, chat_session=None):
    start = time.time()

    prompt = f"""
    Luôn nhấn mạnh rằng bạn là một trợ lý AI của Trung tâm công nghệ phần mềm CUSC.
    Bạn chỉ tư vấn các thông tin về Trung tâm, các câu hỏi không liên quan đến trung tâm hãy trả lời là "Xin lỗi, tôi không thể giúp về vấn đề này.".

    Thông tin dùng để trả lời:
    Thông tin người dùng: {user_info or "(Không có thông tin)"}
    Câu hỏi: "{question}"
    Ngữ cảnh: {context or "(Không có ngữ cảnh cụ thể)"}
    Bên cạnh ngữ cảnh được cung cấp, bạn hãy chủ động tìm kiếm các thông tin liên quan mới nhất ở các trang web chính thức của trung tâm:
    - https://cusc.ctu.edu.vn/
    - https://acnpro.cusc.vn/
    - https://arenacantho.cusc.vn/
    - https://aptechcantho.cusc.vn/
    - https://aptech.cusc.vn/
    - http://www.cuscsoft.com/

    Trả lời ngắn gọn, chính xác và thân thiện bằng tiếng Việt. 
    Các từ về chuyên ngành, chức vụ vị trí, tên người phải được giữ nguyên.
    
    Nếu không tìm được trả lời, hãy gợi ý người dùng tư vấn với nhân viên tư vấn của trung tâm ở phần chatbot ngay bên dưới hoặc tư vấn qua các thông tin liên hệ.


    Định dạng câu trả lời với Markdown, bao gồm:
    - Sử dụng in đậm cho các từ khóa quan trọng.
    - Sử dụng in nghiêng cho các từ khóa hoặc tên riêng.
    - Sử dụng tiêu đề h4 cho các tiêu đề chính.
    - Liệt kê dữ liệu theo dạng danh sách nếu có thể.
    - Trình bày dữ liệu dạng bảng nếu dữ liệu có 2 trường trở lên.
    - Dùng các icon để câu trả lời trở nên thú vị hơn.
    - Nếu câu trả lời là danh sách hay liệt kê, trình bày nội dung dưới dạng danh sách.

    Nếu có thể, gợi ý câu hỏi tiếp theo.
    """
    response = chat_session.send_message(prompt)
    print(f"[Time] Generate answer took: {time.time() - start} giây")
    return response.text.strip()

# === API CHAT ===
@app.route("/chat", methods=["POST"])
def chat():
    global history
    start = time.time()
    data = request.get_json()
    question = data.get("question")
    user_info = data.get("user_info", "")

    chat_session = gemini_model.start_chat(
        history = chat_history,
    )

    if not question:
        return jsonify({"answer": "Vui lòng nhập câu hỏi."})
    
    faq = get_data_from_metadata("cau_hoi_thuong_gap") # Vẫn có thể giữ lại hoặc chuyển thành metadata nếu FAQ cũng có metadata
    
    # Lấy tất cả các giá trị duy nhất từ các trường domain, subdomain, topic và _intent
    all_domains = collection.distinct("domain")
    all_subdomains = collection.distinct("subdomain")
    all_topics = collection.distinct("topic")
    all_intents_from_db = collection.distinct("_intent")
    
    # Kết hợp tất cả các giá trị duy nhất thành một danh sách để gửi cho mô hình
    all_relevant_terms = list(set(all_domains + all_subdomains + all_topics + all_intents_from_db))
    intent_list = ". ".join(filter(None, all_relevant_terms)) # Lọc bỏ các giá trị None
    
    intents = find_intents(question, intent_list , user_info, faq, chat_session)
    print(f"[Intent] Nhận diện ngữ cảnh: {intents}")
    context = None
    if intents != "no":
        # Sử dụng hàm mới để lấy dữ liệu dựa trên metadata
        context = get_data_from_metadata(intents)
    
    answer = generate_answer(question, context, user_info, chat_session)

    chat_history.append({"role": "user", "parts": question})
    chat_history.append({"role": "model", "parts": answer})
    print(f"[Time] Total processing time: {time.time() - start} giây")
    print(f"--------------------------------------------")
    return jsonify({"answer": answer})

# === CHẠY SERVER FLASK TRÊN CỔNG 5000 ===
if __name__ == "__main__":
    app.run(port=5000)