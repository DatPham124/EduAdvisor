import os
import dotenv
from rapidfuzz import process
import google.generativeai as genai

dotenv.load_dotenv()
genai.configure(api_key=os.getenv("GEMINI_API_KEY"))
gemini_model = genai.GenerativeModel(model_name="gemini-2.0-flash")

history = []

def find_intents(question):
    with open("intent.txt", "r", encoding="utf-8") as intent_data:
        intent_content = intent_data.read()
    prompt = f"""
    Bạn là một người tư vấn thông minh, thân thiện và chuyên nghiệp của Trung tâm công nghệ phần mềm CUSC (Can Tho University Software Center). 
    Bạn sẽ phân loại câu hỏi của người dùng vào một trong các ngữ cảnh có sẵn.
    Câu hỏi: "{question}"
    Danh sách ngữ cảnh hợp lệ: {intent_content}

    Hãy trả về 3 ngữ cảnh liên quan nhất trong các ngữ cảnh bên trên, sắp xếp theo thứ tự ưu tiên, nối với nhau bằng dấu chấm '.' và không thêm giải thích, không thêm dấu câu, không viết thêm bất kỳ ký tự nào ngoài tên ngữ cảnh.
    Nếu không thể xác định được ngữ cảnh, chỉ trả về "no".
    """
    response = gemini_model.generate_content(prompt)
    return response.text.strip()

# === LẤY DỮ LIỆU TỪ FILE THEO INTENT (GỘP TẤT CẢ) ===
def get_data_from_intent(intents):
    list_intents = [i.strip() for i in intents.split('.') if i.strip()]
    combined_content = ""

    for intent in list_intents:
        data_file = f"data/{intent}.txt"
        if os.path.exists(data_file):
            with open(data_file, "r", encoding="utf-8") as file:
                content = file.read().strip()
                if content:
                    combined_content += f"\n--- Ngữ cảnh: {intent} ---\n{content}\n"

    return combined_content.strip() if combined_content else None

# === TÌM CÂU HỎI GẦN GIỐNG TRONG LOG ===
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
    history = ""
    for q, a in reversed(history):
        turn = f"Người dùng: {q}\nChatbot: {a}\n"
        if len(history) + len(turn) > max_chars:
            break
        history = turn + history  
    return history

def generate_answer(question, context):
    history = get_limited_history()
    prompt = f"""
    Bạn là một người tư vấn thông minh, thân thiện và chuyên nghiệp của Trung tâm công nghệ phần mềm CUSC (Can Tho University Software Center).

    Dưới đây là hội thoại trước đó giữa người dùng và bạn: {history} và dựa trên thông tin này để bổ sung ngữ cảnh.

    Câu hỏi hiện tại: "{question}"
    Thông tin trong ngữ cảnh sau: {context or "(Không có ngữ cảnh đặc biệt)"}

    Dựa trên thông tin trên, hãy trả lời câu hỏi một cách ngắn gọn, chính xác và thân thiện bằng tiếng Việt.
    Nếu nội dung là danh sách, hãy trả lời theo định dạng danh sách.
    Gợi ý câu hỏi tiếp theo dựa trên dữ liệu trong context và các dữ liệu khác nếu cần thiết.
    """
    response = gemini_model.generate_content(prompt)
    return response.text.strip()

# === GHI LOG VÀO FILE ===
def log_interaction(question, answer):
    with open("log.csv", "a", encoding="utf-8") as log_file:
        log_file.write(f"\nQ: {question}\nA: {answer}\n")

# === CHƯƠNG TRÌNH CHÍNH ===
def main():
    global history
    while True:
        question = input("Bạn (Nhập 'exit' để thoát): ")
        if question.lower() == "exit":
            print("-" * 50)
            break   
        if not question.strip():
            print("Vui lòng nhập câu hỏi.")
            continue

        with open("log.csv", "r", encoding="utf-8") as log:
            log_content = log.read()

        answer = find_similar_question(question, log_content)

        from_log = True
        if answer == "no":
            intents = find_intents(question)
            print(f"[Intent] Nhận diện ngữ cảnh: {intents}")
            context = None
            if intents != "no":
                context = get_data_from_intent(intents)
                from_log = False
            answer = generate_answer(question, context)

        if not from_log:
            log_interaction(question, answer)

        history.append((question, answer))

        print("\nChat bot:", answer)
        print("-" * 50)

if __name__ == "__main__":
    main()
