# app.py
import os
import dotenv
from pymongo import MongoClient
from flask import Flask, request, jsonify
import google.generativeai as genai

# Load môi trường
dotenv.load_dotenv()
genai.configure(api_key=os.getenv("GEMINI_API_KEY"))
gemini_model = genai.GenerativeModel(model_name="gemini-2.0-flash")

# Kết nối MongoDB 
client = MongoClient("mongodb://localhost:27017/")
db = client["eduadvisor"] 
collection = db["documents"]


app = Flask(__name__)

def find_intent(question):
    with open("intent.txt", "r", encoding="utf-8") as intent_data:
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
    document = collection.find_one({"_intent": intent})
    if document:
        return document["content"]
    else:
        return None  

def find_faq(question, faq_content):
    prompt = f"""
    Bạn là một người tư vấn thông minh, thân thiện và chuyên nghiệp của Trung tâm công nghệ phần mềm CUSC (Can Tho University Software Center).
    Hãy tìm câu trả lời cho câu hỏi: {question} trong dữ liệu FAQ sau đây: {faq_content} và trả lại kết quả là một trong các câu trả lời sau đây:
    {faq_content}.
    Nếu không thấy câu trả lời, hãy trả về "no" viết thường và không có ký tự đặc biệt.
    """
    response = gemini_model.generate_content(prompt)
    return response.text.strip()

def generate_answer(question, context, user_info):
    prompt = f"""
    Bạn là một người tư vấn thông minh, thân thiện và chuyên nghiệp của Trung tâm công nghệ phần mềm CUSC (Can Tho University Software Center). Dưới đây là 
    thông tin người hỏi và ngữ cảnh liên quan để trả lời câu hỏi của họ.

    Câu hỏi: "{question}"
    Thông tin người dùng: {user_info}
    Thông tin trong ngữ cảnh sau: {context} 

    Dựa trên thông tin trên, hãy trả lời câu hỏi ngắn gọn, chính xác và thân thiện bằng tiếng Việt.
    Nếu nội dung là danh sách, hãy trả lời theo định dạng danh sách số thứ tư.
    Nếu người dùng cần tư vấn về khóa học, hãy giúp họ lựa chọn khóa học phù hợp với sở thích, mục tiêu và năng lực của họ.
    Không liệt kê bằng dấu * hãy thay thế bằng số thứ tự
    """
    response = gemini_model.generate_content(prompt)
    return response.text.strip()

@app.route("/chat", methods=["POST"])
def chat():
    data = request.get_json()
    question = data.get("question")
    user_info = data.get("user_info", "")

    if not question:
        return jsonify({"answer": "Vui lòng nhập câu hỏi."})

    with open("faq.txt", "r", encoding="utf-8") as faq:
        faq_content = faq.read()

    context = find_faq(question, faq_content)
    intent = ""
    if context == "no":
        intent = find_intent(question)
        if intent:
            context = get_data_from_intent(intent)
        else:
            context = ""

    answer = generate_answer(question, context, user_info)
    return jsonify({"answer": answer})

if __name__ == "__main__":
    app.run(port=5000, debug=True)
