import os
import dotenv
import google.generativeai as genai

from fastapi import FastAPI
from pydantic import BaseModel
from retrieve import retrieve_context_from_qdrant

# Load API key
dotenv.load_dotenv()
genai.configure(api_key=os.getenv("GEMINI_API_KEY"))
gemini_model = genai.GenerativeModel(model_name="gemini-2.0-flash")

# FastAPI app
app = FastAPI()

# Pydantic model
class ChatRequest(BaseModel):
    question: str
    user_info: str

# Hàm sinh câu trả lời
def generate_answer(question, context):
    prompt = f"""
    Bạn là một người tư vấn thông minh, thân thiện và chuyên nghiệp của Trung tâm công nghệ phần mềm CUSC (Can Tho University Software Center). Dưới đây là 
    một số thông tin cần thiết để trả lời câu hỏi của người dùng.

    Câu hỏi: "{question}"
    Nội dung cần tham khảo để trả lời câu hỏi:
    {context}

    Dựa trên thông tin trên, hãy trả lời câu hỏi chính xác, đúng trọng tâm, ngắn gọn, tự nhiên và thân thiện bằng tiếng Việt
    Nếu nội dung là danh sách, hãy trả lời theo định dạng danh sách.
    Không gợi ý ngành phù hợp với sở thích nếu không được hỏi
    Nếu nội dung có sai chính tả, hãy sửa sai chính tả.
    Không cần lặp lại câu hỏi của người dùng trong câu trả lời.
    Nếu câu hỏi không còn liên quan đến lựa chọn của người dùng, không cần phải áp dụng nó vào câu trả lời của bạn.
    Hãy gợi ý bước tiếp theo dựa trên dữ liệu đã cho nếu người dùng không đặt câu hỏi rõ ràng.
    Nếu tài liệu thiếu thông tin hãy trả lời theo hiểu biết của bạn.
    """
    response = gemini_model.generate_content(prompt)
    return response.text.strip()

# Đây mới là endpoint đúng!
@app.post("/chat")
def chat(req: ChatRequest):
    full_question = f"{req.user_info}. {req.question}"
    context = retrieve_context_from_qdrant(full_question, limit=15)
    print("Context:", context)
    answer = generate_answer(full_question, context)
    return {"answer": answer}
