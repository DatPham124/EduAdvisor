import os
import dotenv
import google.generativeai as genai

dotenv.load_dotenv()
genai.configure(api_key=os.getenv("GEMINI_API_KEY"))
gemini_model = genai.GenerativeModel(model_name="gemini-2.0-flash")

def find_intent(question):
    intent_data = open("intent.txt", "r", encoding="utf-8")
    intent_content = intent_data.read()
    prompt = f"""
    Bạn là một người tư vấn thông minh, thân thiện và chuyên nghiệp của Trung tâm công nghệ phần mềm CUSC (Can Tho University Software Center). 
    Bạn sẽ phân loại câu hỏi sau đây vào một trong các ngữ cảnh có sẵn.

    Câu hỏi: "{question}"

    Danh sách ngữ cảnh hợp lệ:
    {intent_content}

    Hãy chỉ trả về MỘT trong các ngữ cảnh bên trên. KHÔNG thêm giải thích, không thêm dấu câu, không viết thêm bất kỳ ký tự nào ngoài tên ngữ cảnh.
    Nếu không thể xác định được ngữ cảnh, chỉ trả về chuỗi rỗng.
    """

    response = gemini_model.generate_content(prompt)
    return response.text.strip()

def get_data_from_intent(intent):
    data_file = f"../documents/{intent}.txt"
    with open(data_file, "r", encoding="utf-8") as file:
        data_content = file.read()
    return data_content
   
def find_faq(question, faq_content):
    prompt = f"""
    Bạn là một người tư vấn thông minh, thân thiện và chuyên nghiệp của Trung tâm công nghệ phần mềm CUSC (Can Tho University Software Center).
    Hãy tìm câu trả lời cho câu hỏi: {question} trong dữ liệu FAQ sau đây: {faq_content} và trả lại kết quả là một trong các câu trả lời sau đây:
    {faq_content}.
    Nếu không thấy câu trả lời, hãy trả về "no" viết thường và không có ký tự đặc biệt.
    """
    response = gemini_model.generate_content(prompt)
    return response.text.strip()

def generate_answer(question, context):
    prompt = f"""
    Bạn là một người tư vấn thông minh, thân thiện và chuyên nghiệp của Trung tâm công nghệ phần mềm CUSC (Can Tho University Software Center). Dưới đây là 
    một số thông tin cần thiết để trả lời câu hỏi của người dùng.

    Câu hỏi: "{question}"
    Thông tin trong ngữ cảnh sau: {context} 

    Dựa trên thông tin trên, hãy trả lời câu hỏi ngắn gọn, chính xác và thân thiện bằng tiếng .
    Nếu nội dung là danh sách, hãy trả lời theo định dạng danh sách.
    Nếu người dùng cần tư vấn về khóa học, hãy giúp họ lựa chọn khóa học phù hợp với sở thích, mục tiêu và năng lực của họ.
    """
    response = gemini_model.generate_content(prompt)
    return response.text.strip()

def main():
    faq = open("faq.txt", "r", encoding="utf-8")
    faq_content = faq.read()
    while True:
        question = input("Bạn (Nhập 'exit' để thoát): ")
        if question.lower() == "exit":
            print("-" * 50)
            break   
        context = find_faq(question, faq_content)
        intent=""
        if context == "no":
            intent = find_intent(question)
            print('intent 1:', intent)
            context = get_data_from_intent(intent)
        else:
            print("Context found in FAQ.")
            print('context FAQ:', context)
        print('intent 2:', intent)
        answer = generate_answer(question, context)
        print("\nChat bot:", answer)
        print("-" * 50)

if __name__ == "__main__":
    main()
