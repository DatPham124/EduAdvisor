import os
import dotenv
from pymongo import MongoClient
from flask import Flask, request, jsonify
from rapidfuzz import process
import google.generativeai as genai
from rapidfuzz import fuzz

dotenv.load_dotenv()
genai.configure(api_key=os.getenv("GEMINI_API_KEY"))
gemini_model = genai.GenerativeModel(model_name="gemini-2.5-flash")

# === KẾT NỐI MONGODB ===
client = MongoClient("mongodb://localhost:27017/")
db = client["eduadvisor"]
collection = db["documents"]

app = Flask(__name__)
history = []

def extract_options_from_answer(answer, all_intents):
    joined_intents = ". ".join(all_intents)
    prompt = f"""
    Phản hồi sau đây là câu trả lời của chatbot đang tư vấn cho học viên:

    "{answer}"

    Nhiệm vụ của bạn là:
    1. Trích xuất các lựa chọn mà chatbot đang gợi ý (ví dụ như tên chương trình học, tên khoá học).
    2. Với mỗi lựa chọn, xác định ngữ cảnh phù hợp nhất từ danh sách intent có sẵn bên dưới.
    3. Trả về kết quả dưới dạng JSON:
    {{
      "options": {{
        "Tên hiển thị của lựa chọn": "intent tương ứng"
      }}
    }}

    Danh sách intent hợp lệ: {joined_intents}

    Nếu không tìm thấy lựa chọn nào thì trả về:
    {{
      "options": {{}}
    }}
    """
    response = gemini_model.generate_content(prompt)
    try:
        json_block = response.text.strip().split("```json")[-1].split("```")[0] if "```json" in response.text else response.text
        import json
        return json.loads(json_block)
    except Exception as e:
        print("[Error] Không thể phân tích options từ Gemini:", e)
        return {"options": {}}


def match_option_to_intent(question, options_dict):
    for option_text, intent in options_dict.items():
        if fuzz.partial_ratio(question.lower(), option_text.lower()) > 80:
            return intent
    return None

def find_intents(question, intent_list, user_info=None):
    joined_intents = ". ".join(intent_list)

    last_turn = history[-1] if history else None
    last_q = last_turn["question"] if last_turn else ""
    last_a = last_turn["answer"] if last_turn else ""
    last_intent = last_turn["intent"] if last_turn else ""
    last_options = last_turn.get("options", {}) if last_turn else {}

    # 👉 Nếu câu hỏi phù hợp 1 trong các lựa chọn của bot trước đó
    matched_intent = match_option_to_intent(question, last_options)
    if matched_intent:
        print(f"[OptionMatch] Câu hỏi khớp với lựa chọn: {matched_intent}")
        return matched_intent

    # Nếu giống phản hồi trước (fuzzy match)
    if fuzz.partial_ratio(question.lower(), last_a.lower()) > 85:
        return last_intent or "no"
    
    print(f"Thông tin người dùng: {user_info}")

    # Nếu không khớp, dùng Gemini để suy luận
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

    Danh sách ngữ cảnh: {joined_intents}

    Hướng dẫn:
    - Nếu câu hỏi này là một phần của lựa chọn được chatbot gợi ý trước đó → xác định intent tương ứng.
    - Nếu người dùng đang hỏi chi tiết một lựa chọn cụ thể → giữ đúng intent đó.
    - Nếu không xác định được → trả về "no".
    
    Trả về tối đa 3 intent, cách nhau bằng dấu chấm `.`, không giải thích.
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

def get_limited_history(max_chars=1000):
    history_text = ""
    for entry in reversed(history):
        turn = f"Người dùng: {entry['question']}\nchatbot: {entry['answer']}\n"
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
    
    all_intents = [doc["_intent"] for doc in collection.find({}, {"_intent": 1})]
    intents = find_intents(question, all_intents, user_info)
    print(f"[Intent] Nhận diện ngữ cảnh: {intents}")
    context = None
    if intents != "no":
        context = get_data_from_intent(intents)
    answer = generate_answer(question, context, user_info)

    # Dùng Gemini để trích xuất options
    option_data = extract_options_from_answer(answer, all_intents)
    options = option_data.get("options", {})

    history.append({
        "question": question,
        "answer": answer,
        "intent": intents if intents != "no" else None,
        "options": options
    })

    return jsonify({"answer": answer})

# === CHẠY SERVER FLASK TRÊN CỔNG 5000 ===
if __name__ == "__main__":
    app.run(port=5000)
