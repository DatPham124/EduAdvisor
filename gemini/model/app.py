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
gemini_model = genai.GenerativeModel(model_name="gemini-2.5-flash")

# === KẾT NỐI MONGODB ===
client = MongoClient("mongodb://localhost:27017/")
db = client["eduadvisor"]
collection = db["documents"]

app = Flask(__name__)
history = []

def normalize_text(text):
    text = unidecode(text)                  
    text = text.lower()                     
    text = re.sub(r"[^\w\s]", "", text)    
    text = re.sub(r"\s+", " ", text).strip()
    return text

def find_intents(question, intent_list, user_info=None, faq_text=None):
    start = time.time()

    last_turn = history[-1] if history else None
    last_q = last_turn["question"] if last_turn else ""
    last_a = last_turn["answer"] if last_turn else ""
    last_intent = last_turn["intent"] if last_turn else ""

    # Nếu giống phản hồi trước (fuzzy match)
    if fuzz.partial_ratio(question.lower(), last_a.lower()) > 85:
        return last_intent or "no"
    
    faq_pairs = re.findall(r"Q:\s*(.*?)\s*A:\s*(.*?)(?=\nQ:|\Z)", faq_text, re.DOTALL)
    similarity = 0

    for q, _ in faq_pairs:
        similarity = fuzz.partial_ratio(
            normalize_text(question), 
            normalize_text(q)
        )
        if similarity >= 80:  # Ngưỡng tùy chỉnh
            print(f"[Match] Giống FAQ: {q} ({similarity}%)")
            return "cau_hoi_thuong_gap"
    
    print('[Unmatched] Độ tương tự chỉ: {:.2f}%'.format(similarity))
    
    prompt = f"""
    Bạn là chuyên gia phân tích ngữ cảnh cho chatbot tại Trung tâm CUSC.
    Dựa trên câu hỏi người dùng, sở thích của họ và lịch sử hội thoại, bạn cần xác định ngữ cảnh phù hợp nhất.
    Dưới đây là thông tin cần thiết:

    Câu hỏi người dùng: "{question}"
    Sở thích của người dùng: {user_info or "(Không có thông tin)"}
    Lịch sử gần nhất:
    - Người dùng: {last_q}
    - Chatbot: {last_a}
    - Ngữ cảnh trước: {last_intent or "(chưa có)"}

    Danh sách ngữ cảnh: {intent_list}

    Hướng dẫn:
    - Nếu câu hỏi này là một phần của lựa chọn được chatbot gợi ý trước đó → xác định intent tương ứng.
    - Nếu người dùng đang hỏi chi tiết một lựa chọn cụ thể → giữ đúng intent đó.
    - Nếu không xác định được nữa  → trả về "no".
    
    Trả về 1 intent liên quan nhất, cách nhau bằng dấu chấm `.`, không giải thích.
    """

    response = gemini_model.generate_content(prompt)
    print(f"[Time] Find intents took: {time.time() - start} giây")
    return response.text.strip()



# === LẤY DỮ LIỆU TỪ MONGODB THEO INTENT ===
def get_data_from_intent(intents):
    list_intents = [i.strip() for i in intents.split('.') if i.strip()]
    combined_content = ""

    for intent in list_intents:
        doc = collection.find_one({"_intent": intent})
        if doc and doc.get("content"):
            combined_content += f"\n--- Ngữ cảnh: {intent} ---\n{doc['content']}\n"
    return combined_content.strip() if combined_content else None

def get_limited_history(max_chars=500):
    history_text = ""
    for entry in reversed(history):
        turn = f"Người dùng: {entry['question']}\nchatbot: {entry['answer']}\n"
        if len(history_text) + len(turn) > max_chars:
            break
        history_text = turn + history_text
    return history_text

# def count_tokens(text, model="gpt-3.5-turbo"):
#     encoding = tiktoken.encoding_for_model(model)
#     tokens = encoding.encode(text)
#     return len(tokens)

def generate_answer(question, context, user_info=None):
    start = time.time()
    chat_history = get_limited_history()

    prompt = f"""
    Bạn là một người tư vấn thông minh, thân thiện và chuyên nghiệp của Trung tâm phần mềm CUSC.

    Thông tin người dùng: {user_info or "(Không có thông tin)"}
    Hội thoại trước: {chat_history}

    Câu hỏi: "{question}"
    Ngữ cảnh: {context or "(Không có ngữ cảnh cụ thể)"}

    Trả lời ngắn gọn, chính xác và thân thiện bằng tiếng Việt.
    Không quá 100 từ.
    Nếu không có thông tin dù đã xác định được ngữ cảnh, hãy tìm kiếm thông tin trên internet và các trang web uy tín để trả lời.
    Nếu có thể, gợi ý câu hỏi tiếp theo.
    """
    response = gemini_model.generate_content(prompt)
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

    if not question:
        return jsonify({"answer": "Vui lòng nhập câu hỏi."})
    
    faq = get_data_from_intent("cau_hoi_thuong_gap")
    all_intents = [doc["_intent"] for doc in collection.find({}, {"_intent": 1})]
    intent_list = ". ".join(all_intents)
    # token_itents = count_tokens(intent_list)
    intents = find_intents(question,intent_list , user_info, faq)
    print(f"[Intent] Nhận diện ngữ cảnh: {intents}")
    context = None
    if intents != "no":
        context = get_data_from_intent(intents)
    answer = generate_answer(question, context, user_info)

    history.append({
        "question": question,
        "answer": answer,
        "intent": intents if intents != "no" else None,
    })
    print(f"[Time] Total processing time: {time.time() - start} giây")
    print(f"--------------------------------------------")
    return jsonify({"answer": answer})

# === CHẠY SERVER FLASK TRÊN CỔNG 5000 ===
if __name__ == "__main__":
    app.run(port=5000)
