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
import tiktoken

dotenv.load_dotenv()
genai.configure(api_key=os.getenv("GEMINI_API_KEY"))
gemini_model = genai.GenerativeModel(model_name="gemini-2.5-flash")

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

def count_tokens_tiktoken(text):
    encoding = tiktoken.get_encoding("cl100k_base")  # gần giống tokenizer của GPT-4/Gemini
    tokens = encoding.encode(text)
    return len(tokens)

def find_intents(question, intent_list, user_info=None, faq_text=None, chat_session=None):
    start = time.time()

    prompt = f"""
        Bạn là chuyên gia phân tích ngữ cảnh cho chatbot tại Trung tâm CUSC.
        Bạn luôn xem lại toàn bộ đoạn hội thoại giữa người dùng và trợ lý AI để nhận diện ngữ cảnh của câu hỏi hiện tại.
        Bạn sẽ nhận được một đoạn hội thoại và câu hỏi mới từ người dùng. 
        Nhiệm vụ của bạn là xác định intent phù hợp nhất với câu hỏi mới dựa trên ngữ cảnh đã có.

        Bây giờ, người dùng vừa hỏi: "{question}"

        Sở thích người dùng: {user_info or "Không có"}

        Danh sách ngữ cảnh có thể: {intent_list}

        Nhiệm vụ của bạn:
        - Xem lại toàn bộ đoạn hội thoại.
        - Nếu thấy người dùng đang **hỏi sâu hơn** về một nội dung nào đã được đề cập → giữ lại intent tương ứng.
        - Nếu câu hỏi mới có thể **liên kết mạch nội dung** từ câu trước → giữ lại intent đó.
        - Nếu hoàn toàn không liên quan → trả về "no".

        Trả về duy nhất 1 intent phù hợp nhất. KHÔNG giải thích.
    """
    try:
        response = chat_session.send_message(prompt)
        if response.candidates:
            candidate = response.candidates[0]
            if candidate.finish_reason == 1 and candidate.content.parts:
                return response.text.strip()
            else:
                print(f"[LỖI] Gemini từ chối trả lời. finish_reason: {candidate.finish_reason}")
                return "no"
        else:
            print("[LỖI] Không có candidate nào được trả về trong find_intents.")
            return "no"
    except Exception as e:
        print("[LỖI] Exception trong find_intents:", e)
        return "no"
    finally:
        print(f"[Time] Find intents took: {time.time() - start} giây")

def get_data_from_metadata(intents):
    list_intents = [i.strip() for i in intents.split('.') if i.strip()]
    combined_content = ""
    for intent in list_intents:
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
    Luôn nhấn mạnh sau lời chào rằng bạn là một trợ lý AI hỗ trợ việc tư vấn tuyển sinh của Trung tâm công nghệ phần mềm CUSC.
    Bạn chỉ tư vấn các thông tin về Trung tâm, các câu hỏi không liên quan đến trung tâm hãy trả lời là "Xin lỗi, tôi không thể giúp về vấn đề này. Bạn hãy liên hệ với nhân viên tư vấn để được hỗ trợ.".
    Nếu người dùng khen hay chê bạn, hãy trả lời là "Cảm ơn bạn đã phản hồi. Tôi sẽ cố gắng cải thiện hơn nữa.".
    Nếu người dùng cảm ơn, hãy trả lời "Không có gì đâu ạ, mình rất vui được hỗ trợ bạn".
    
    Thông tin dùng để trả lời:
    Thông tin người dùng: {user_info or "(Không có thông tin)"}
    Câu hỏi: "{question}"
    Ngữ cảnh: {context}. Nếu khôn có ngữ cảnh, hãy trả về kết quả là "Xin lỗi, tôi không thể trả lời câu hỏi này.".

    Nếu có ngữ cảnh thì trả lời theo hướng dẫn sau: 
    - Bạn luôn trả lời ngắn gọn, chính xác, dễ hiểu và đúng trọng tâm với câu hỏi của người dùng.
    - Các từ về chuyên ngành, chức vụ vị trí, tên người phải được giữ nguyên.   
    - Khi người dùng hỏi về số lượng, hãy tính toán và trả lời chính xác.

    - Nếu người dùng hỏi về học phí, hãy hướng dẫn họ liên hệ với với tư vấn viên qua các phương thức sau:
        - Gọi điện thoại: 0292 383 5581 
        - Liên hệ Hotline: 0901990665 - 0911204994
        - Kết bạn qua Zalo: 0868 952 535 - 0868 952 545
  
   - Trình bày dạng danh sách nếu dữ liệu nhiều mục.
   - Trình bày dạng bảng khi so sánh.

    Nếu có thể, gợi ý câu hỏi tiếp theo ở cuối phần trả lời và cách biệt bằng dấu gạch ngang "---".
    """
    count_token = count_tokens_tiktoken(prompt)
    print(f"[Token] Tổng số token trong prompt generate_answer: {count_token}")
    try:
        response = chat_session.send_message(prompt)
        if response.candidates:
            candidate = response.candidates[0]
            if candidate.finish_reason == 1 and candidate.content.parts:
                return response.text.strip()
            else:
                print(f"[LỖI] Gemini từ chối trả lời. finish_reason: {candidate.finish_reason}")
                return "Xin lỗi, hiện tại tôi chưa thể trả lời câu hỏi này. Bạn vui lòng liên hệ nhân viên tư vấn nhé!"
        else:
            print("[LỖI] Không có candidate nào được trả về trong generate_answer.")
            return "Không thể sinh câu trả lời từ hệ thống."
    except Exception as e:
        print("[LỖI] Exception trong generate_answer:", e)
        return "Đã xảy ra lỗi. Vui lòng thử lại sau."
    finally:
        print(f"[Time] Generate answer took: {time.time() - start} giây")

@app.route("/chat", methods=["POST"])
def chat():
    start = time.time()
    data = request.get_json()
    question = data.get("question")
    user_info = data.get("user_info", "")
    db_history = data.get("history", [])

    for entry in db_history:
        user_q = entry.get("question")
        model_a = entry.get("answer")
        if user_q:
            chat_history.append({"role": "user", "parts": user_q})
        if model_a:
            chat_history.append({"role": "model", "parts": model_a})

    chat_session = gemini_model.start_chat(
        history=chat_history,
    )

    if not question:
        return jsonify({"answer": "Vui lòng nhập câu hỏi."})

    faq = get_data_from_metadata("cau_hoi_thuong_gap")

    all_domains = collection.distinct("domain")
    all_subdomains = collection.distinct("subdomain")
    all_topics = collection.distinct("topic")
    all_intents_from_db = collection.distinct("_intent")
    all_relevant_terms = list(set(all_domains + all_subdomains + all_topics + all_intents_from_db))
    intent_list = ". ".join(filter(None, all_relevant_terms))

    intents = find_intents(question, intent_list, user_info, faq, chat_session)
    print(f"[Intent] Nhận diện ngữ cảnh: {intents}")
    context = "Không có ngữ cảnh cụ thể."
    if intents != "no":
        context = get_data_from_metadata(intents)

    answer = generate_answer(question, context, user_info, chat_session)

    chat_history.append({"role": "user", "parts": question})
    chat_history.append({"role": "model", "parts": answer})
    print(f"[Time] Total processing time: {time.time() - start} giây")
    print(f"--------------------------------------------")
    return jsonify({"answer": answer})

if __name__ == "__main__":
    app.run(port=5000)
