import os
import dotenv
import google.generativeai as genai
from retrieve import retrieve_context_from_qdrant

dotenv.load_dotenv()
genai.configure(api_key=os.getenv("GEMINI_API_KEY"))
gemini_model = genai.GenerativeModel(model_name="gemini-2.0-flash")

def generate_answer(question, context):
    prompt = f"""
    Bạn là một người tư vấn thông minh, thân thiện và chuyên nghiệp của Trung tâm công nghệ phần mềm CUSC (Can Tho University Software Center). Dưới đây là 
    một số thông tin cần thiết để trả lời câu hỏi của người dùng.

    Câu hỏi: "{question}"
    Nội dung cần tham khảo để trả lời câu hỏi:
    {context}

    Dựa trên thông tin trên, hãy trả lời câu hỏi chính xác, tự nhiên và thân thiện bằng tiếng Việt
    Nếu nội dung là danh sách, hãy trả lời theo định dạng danh sách.
    Nếu nội dung có sai chính tả, hãy sửa sai chính tả.
    Không cần lặp lại câu hỏi của người dùng trong câu trả lời.
    Nếu người dùng cần tư vấn về khóa học, hãy giúp họ lựa chọn khóa học phù hợp với sở thích và mục tiêu của họ.
    Nếu câu hỏi không còn liên quan đến lựa chọn của người dùng, không cần phải áp dụng nó vào câu trả lời của bạn.
    Hãy gợi ý bước tiếp theo dựa trên dữ liệu đã cho nếu người dùng không đặt câu hỏi rõ ràng.
    """
    response = gemini_model.generate_content(prompt)
    return response.text.strip()

def main():
    while True:
        question = input("Bạn (Nhập 'exit' để thoát): ")
        if question.lower() == "exit":
            print("-" * 50)
            break   
        context = retrieve_context_from_qdrant(question, limit=10)
        answer = generate_answer(question, context)
        print("\nChat bot:", answer)
        print("-" * 50)

if __name__ == "__main__":
    main()
