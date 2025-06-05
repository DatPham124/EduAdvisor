import os
import dotenv
import google.generativeai as genai

dotenv.load_dotenv()
genai.configure(api_key=os.getenv("GEMINI_API_KEY"))
gemini_model = genai.GenerativeModel(model_name="gemini-2.0-flash")

def load_intents(filepath="intent.txt"):
    with open(filepath, "r", encoding="utf-8") as f:
        return [line.strip() for line in f if line.strip()]

def classify_intent(question, intents):
    prompt = f"""
    Cho câu hỏi sau: "{question}"
    # Chọn intent phù hợp nhất từ danh sách sau:
    # {chr(10).join(f"- {i}" for i in intents)}

    Nếu câu hỏi quá mơ hồ, hãy yêu cầu người dùng cung cấp thêm thông tin.

    Trả lời dưới dạng:
    intent: <tên_intent>
    """
    response = gemini_model.generate_content(prompt)
    return response.text.strip().replace("intent:", "").strip()

def read_data_for_intent(intent, data_folder="data"):
    filepath = os.path.join(data_folder, f"{intent}.txt")
    if not os.path.exists(filepath):
        return f"(Không có dữ liệu cho intent: {intent})"
    with open(filepath, "r", encoding="utf-8") as f:
        return f.read()

def generate_answer(question, context, history):
    # Kết hợp lịch sử hội thoại vào prompt
    history_prompt = "\n".join(history)
    prompt = f"""
    Bạn là một người tư vấn thông minh, thân thiện và chuyên nghiệp của Trung tâm công nghệ phần mềm CUSC (Can Tho University Software Center). Dưới đây là 
    một số thông tin cần thiết để trả lời câu hỏi của người dùng.

    Lịch sử hội thoại:
    {history_prompt}

    Câu hỏi: "{question}"
    Thông tin tham khảo:
    {context}

    Dựa trên thông tin trên, hãy trả lời câu hỏi chính xác, tự nhiên và thân thiện bằng tiếng Việt
    Nếu nội dung là danh sách, hãy trả lời theo định dạng danh sách.
    Nếu nội dung có sai chính tả, hãy sửa sai chính tả.
    Hãy gợi ý câu hỏi tiếp theo nếu cần thiết.
    """
    response = gemini_model.generate_content(prompt)
    return response.text.strip()

def main():
    intents = load_intents()
    history = []  # Khởi tạo lịch sử hội thoại
    while True:
        question = input("Bạn (Nhập 'exit' để thoát): ")
        if question.lower() == "exit":
            print("-" * 50)
            break   
        intent = classify_intent(question, intents)
        # print(f"→ Intent xác định: {intent}")
        context = read_data_for_intent(intent)
        answer = generate_answer(question, context, history)
        print("\nChat bot:", answer)
        print("intent:", intent)
        
        # Cập nhật lịch sử hội thoại
        history.append(f"Người dùng: {question}")
        history.append(f"Chat bot: {answer}")

if __name__ == "__main__":
    main()
