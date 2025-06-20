import os
import dotenv
from pymongo import MongoClient
from flask import Flask, request, jsonify
from rapidfuzz import process
import google.generativeai as genai

dotenv.load_dotenv()
genai.configure(api_key=os.getenv("GEMINI_API_KEY"))
gemini_model = genai.GenerativeModel(model_name="gemini-2.0-flash")

# === KẾT NỐI MONGODB ===
client = MongoClient("mongodb://localhost:27017/")
db = client["eduadvisor"]
collection = db["documents"]

app = Flask(__name__)
history = []

# === TÌM INTENT ===
def find_intents(question):
    intent_list = [doc["_intent"] for doc in collection.find({}, {"_intent": 1})]
    joined_intents = ". ".join(intent_list)
    prompt = f"""
    Bạn là một người tư vấn thông minh và thân thiện tại CUSC.

    Hãy phân loại câu hỏi sau vào các ngữ cảnh phù hợp.
    Câu hỏi: "{question}"
    Danh sách ngữ cảnh hợp lệ: {joined_intents}

    Trả về 3 ngữ cảnh liên quan nhất nối với dấu chấm (.) theo thứ tự ưu tiên, không thêm giải thích.
    Nếu không xác định được, trả về "no".
    """
    response = gemini_model.generate_content(prompt)
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

# === TÌM CÂU HỎI GẦN GIỐNG ===
def find_similar_question(question, log_content, threshold=90):
    log_entries = log_content.split("\nQ: ")
    log_qa = []
    for entry in log_entries:
        if "\nA: " in entry:
            q, a = entry.split("\nA: ", 1)
            log_qa.append((q.strip(), a.strip()))
    
    questions = [q for q, _ in log_qa]
    match = process.extractOne(question, questions, score_cutoff=threshold)
    if match:
        matched_q = match[0]
        for q, a in log_qa:
            if q == matched_q:
                print("[Log] Khớp với câu đã có trong log.")
                return a
    return "no"

def get_limited_history(max_chars=1000):
    history_text = ""
    for q, a in reversed(history):
        turn = f"Người dùng: {q}\nChatbot: {a}\n"
        if len(history_text) + len(turn) > max_chars:
            break
        history_text = turn + history_text  
    return history_text

def generate_answer(question, context, user_info=None):
    chat_history = get_limited_history()
    prompt = f"""
    Bạn là một người tư vấn thông minh, thân thiện và chuyên nghiệp của Trung tâm phần mềm CUSC.

    Thông tin người dùng: {user_info or "(Không có thông tin)"}
    Hội thoại trước: {chat_history}

    Câu hỏi: "{question}"
    Ngữ cảnh: {context or "(Không có ngữ cảnh cụ thể)"}

    Trả lời ngắn gọn, chính xác và thân thiện bằng tiếng Việt.
    Nếu có thể, gợi ý câu hỏi tiếp theo.
    """
    response = gemini_model.generate_content(prompt)
    return response.text.strip()

# === GHI LOG ===
def log_interaction(question, answer):
    with open("log.csv", "a", encoding="utf-8") as log_file:
        log_file.write(f"\nQ: {question}\nA: {answer}\n")

# === API CHAT ===
@app.route("/chat", methods=["POST"])
def chat():
    global history
    data = request.get_json()
    question = data.get("question")
    user_info = data.get("user_info", "")

    if not question:
        return jsonify({"answer": "Vui lòng nhập câu hỏi."})

    try:
        with open("log.csv", "r", encoding="utf-8") as log:
            log_content = log.read()
    except FileNotFoundError:
        log_content = ""

    answer = find_similar_question(question, log_content)
    from_log = True

    if answer == "no":
        intents = find_intents(question)
        print(f"[Intent] Nhận diện ngữ cảnh: {intents}")
        context = None
        if intents != "no":
            context = get_data_from_intent(intents)
            from_log = False
        answer = generate_answer(question, context, user_info)

    if not from_log:
        log_interaction(question, answer)

    history.append((question, answer))
    return jsonify({"answer": answer})

# === CHẠY SERVER FLASK TRÊN CỔNG 5000 ===
if __name__ == "__main__":
    app.run(port=5000)
