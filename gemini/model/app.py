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
import gspread
from google.oauth2.service_account import Credentials
from datetime import datetime

dotenv.load_dotenv()
genai.configure(api_key=os.getenv("GEMINI_API_KEY"))
gemini_model = genai.GenerativeModel(model_name="gemini-2.5-flash")

client = MongoClient("mongodb://localhost:27017/")
db = client["eduadvisor"]
collection = db["documents"]

app = Flask(__name__)
chat_history = []

def count_tokens_tiktoken(text):
    encoding = tiktoken.get_encoding("cl100k_base")
    return len(encoding.encode(text))

def append_to_google_sheet(question, answer, time_taken, count_token):
    try:
        scope = ["https://www.googleapis.com/auth/spreadsheets"]
        creds = Credentials.from_service_account_file("../credentials.json", scopes=scope)
        client = gspread.authorize(creds)

        spreadsheet_id = os.getenv("GOOGLE_SHEET_ID")
        sheet = client.open_by_key(spreadsheet_id).worksheet("test_v1")  # <-- đổi thành tên sheet của bạn

        # Kiểm tra xem có tiêu đề chưa
        header = sheet.row_values(1)
        if not header or "Ngày test" not in header:
            sheet.insert_row(["STT", "Ngày test", "Câu hỏi", "Câu trả lời", "Điểm", "Thời gian xử lý", "Số token"], index=1)

        # Xác định số thứ tự (STT)
        num_rows = len(sheet.get_all_values())  # bao gồm cả dòng tiêu đề
        stt = num_rows  # vì dòng tiêu đề là hàng 1 → STT thực tế bắt đầu từ 1

        timestamp = datetime.now().strftime("%d-%m-%Y")
        sheet.append_row([
            stt,              # STT
            timestamp,        # Ngày test
            question,         # Câu hỏi
            answer,           # Câu trả lời
            "",               # Điểm (để trống)
            f"{time_taken:.2f} giây",  # Thời gian xử lý
            count_token       # Số token
        ])
        print(f"[GGSheet] Saved row STT {stt} to Google Sheet.")
    except Exception as e:
        print("[GGSheet] Error saving to Google Sheet:", e)



def find_intents(question, intent_list, user_info=None, chat_session=None):
    prompt = f"""
        Bạn là chuyên gia phân tích ngữ cảnh cho chatbot tại Trung tâm CUSC.
        Bạn luôn xem lại toàn bộ đoạn hội thoại giữa người dùng và trợ lý AI để nhận diện ngữ cảnh của câu hỏi hiện tại.
        Bạn sẽ nhận được một đoạn hội thoại và câu hỏi mới từ người dùng. 
        Nhiệm vụ của bạn là xác định intent phù hợp nhất với câu hỏi mới dựa trên ngữ cảnh đã có, sở thích người dùng và lịch sử hội thoại.

        Bây giờ, người dùng vừa hỏi: "{question}"

        Sở thích người dùng: {user_info or "Không có"}

        Danh sách ngữ cảnh có thể: {intent_list}

        Nhiệm vụ của bạn:
        - Xem lại toàn bộ đoạn hội thoại.
        - Nếu thấy người dùng đang **hỏi sâu hơn** về một nội dung nào đã được đề cập → giữ lại intent tương ứng.
        - Nếu câu hỏi mới có thể **liên kết mạch nội dung** từ câu trước → giữ lại intent đó.
        - Nếu câu hỏi mới **không liên quan** đến bất kỳ intent nào trong danh sách → trả về "no".
        - Nếu câu hỏi liên quan đến các lĩnh vực khác như ăn uống, giải trí, du lịch, sức khỏe, v.v. và không liên quan đến trung tâm CUSC → trả lời "no".

        Trả về duy nhất 1 intent phù hợp nhất. KHÔNG giải thích.
    """
    intent_tokens = count_tokens_tiktoken(prompt)

    try:
        response = chat_session.send_message(prompt)
        if response.candidates:
            candidate = response.candidates[0]
            if candidate.finish_reason == 1 and candidate.content.parts:
                return response.text.strip(), intent_tokens
        return "no", intent_tokens
    except Exception as e:
        print("[ERR] Exception in find_intents:", e)
        return "no", intent_tokens

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
    prompt = f"""
    Luôn nhấn mạnh sau lời chào rằng bạn là một trợ lý AI hỗ trợ việc tư vấn tuyển sinh của Trung tâm công nghệ phần mềm CUSC.
    
    Bạn chỉ tư vấn các thông tin về Trung tâm. 
    Các câu hỏi liên quan đến các lĩnh vực khác như ăn uống, giải trí, du lịch, sức khỏe, v.v. và không liên quan đến trung tâm CUSC, 
    hãy trả lời là "Xin lỗi, tôi không thể giúp về vấn đề này. Bạn hãy liên hệ với nhân viên tư vấn để được hỗ trợ.".
    
    Chỉ đưa thông tin liên hệ khi bạn không thể trả lời câu hỏi của người dùng và đặt nó trên câu hỏi gợi ý.
    Nếu người dùng khen, chê hay cảm ơn bạn, hãy trả lời là "Cảm ơn bạn đã phản hồi. Tôi sẽ cố gắng cải thiện hơn nữa.".

    Thông tin người dùng: {user_info or "(Không có thông tin)"}
    Câu hỏi: "{question}"
    Ngữ cảnh: {context}

    Liên hệ với chúng tôi nếu cần hỗ trợ thêm thông tin về CUSC:
    - Địa chỉ: Khu III, Đại học Cần Thơ, 01 Lý Tự Trọng, Q. Ninh Kiều, TP. Cần Thơ.
    - Điện thoại: +84 292 383 5581
    - Hotline: 0901990665, 0911204994
    - Zalo: 0868 952 535, 0868 952 545
    - Fanpage: https://www.facebook.com/CUSC.CE
    Chúng tôi làm việc từ 7h30 đến 17h30, thứ 2 đến thứ 6, nghỉ thứ 7 và chủ nhật. Hãy liên hệ để chúng tôi hỗ trợ bạn tốt nhất!

    Bên cạnh đó, bạn có thể tham khảo thêm thông tin về CUSC tại các liên kết sau kết với với dữ liệu từ ngữ cảnh để trả lời câu hỏi:
    - https://cusc.ctu.edu.vn/
    - https://aptechcantho.cusc.vn/
    - https://arenacantho.cusc.vn/
    - https://acnpro.cusc.vn/

    Nhiệm vụ của bạn:
    - Trả lời ngắn gọn, rõ ràng, đúng trọng tâm.
    - Giữ nguyên các từ về chức vụ.
    - Nếu được, gợi ý câu hỏi tiếp theo sau cùng, cách biệt bằng dấu "---".
    """
    answer_tokens = count_tokens_tiktoken(prompt)

    try:
        response = chat_session.send_message(prompt)
        if response.candidates:
            candidate = response.candidates[0]
            if candidate.finish_reason == 1 and candidate.content.parts:
                return response.text.strip(), answer_tokens
        return "Xin lỗi, tôi chưa thể trả lời câu hỏi này.", answer_tokens
    except Exception as e:
        print("[ERR] Exception in generate_answer:", e)
        return "Đã xảy ra lỗi. Vui lòng thử lại sau.", answer_tokens

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

    chat_session = gemini_model.start_chat(history=chat_history)

    if not question:
        return jsonify({"answer": "Vui lòng nhập câu hỏi."})

    all_domains = collection.distinct("domain")
    all_subdomains = collection.distinct("subdomain")
    all_topics = collection.distinct("topic")
    all_intents_from_db = collection.distinct("_intent")
    all_relevant_terms = list(set(all_domains + all_subdomains + all_topics + all_intents_from_db))
    intent_list = ". ".join(filter(None, all_relevant_terms))

    intents, intent_tokens = find_intents(question, intent_list, user_info, chat_session)
    context = get_data_from_metadata(intents) if intents != "no" else "Không có ngữ cảnh cụ thể."

    answer, answer_tokens = generate_answer(question, context, user_info, chat_session)

    chat_history.append({"role": "user", "parts": question})
    chat_history.append({"role": "model", "parts": answer})

    time_taken = time.time() - start
    total_tokens = intent_tokens + answer_tokens
    append_to_google_sheet(question, answer, time_taken, total_tokens)

    return jsonify({"answer": answer})

if __name__ == "__main__":
    app.run(port=5000)
