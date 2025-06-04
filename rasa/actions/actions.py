from typing import Any, Text, Dict, List
from rasa_sdk import Action, Tracker
from rasa_sdk.executor import CollectingDispatcher
from qdrant_client.models import Filter, FieldCondition, MatchValue
import dotenv
import google.generativeai as genai

from .model import encode_data
from .connect_qdrant import get_qdrent_client

client = get_qdrent_client()

class ActionSearchVectorResponse(Action):
    def name(self) -> Text:
        return "action_search_vector_respone"

    def run(self, dispatcher: CollectingDispatcher, 
            tracker: Tracker,
            domain: Dict[Text, Any]) -> List[Dict[Text, Any]]:
        
        user_message = tracker.latest_message.get('text')

        intent_name = tracker.latest_message.get('intent', {}).get('name')

        data = self.search_from_vector_model(user_message, intent_name)

        response = self.generate_response(user_message, intent_name, data)

        dispatcher.utter_message(text=response)

        return []
    
    def search_from_vector_model(self, question: str, intent: str) -> str:

        try:
            query_embbding = encode_data(sentences=question)


            hit = client.search(collection_name="EduAdvisor", query_vector=query_embbding, 
                                query_filter=Filter(
                                    must=[
                                        FieldCondition(
                                            key="Category",
                                            match=MatchValue(value=intent)
                                        )
                                    ]
                                ),
                                limit=1,
                                with_payload=True
                                )
            return hit[0].payload["Originals"]
        
        except Exception as e:
            return (f"Có lỗi: {e}")
    
    def generate_response(self, question: str, intent: str, data: str) -> str:
        dotenv.load_dotenv()
        genai.configure(api_key=dotenv.get_key(dotenv.find_dotenv(), "GEMINI_API_KEY"))
        gemini_model = genai.GenerativeModel(model_name="gemini-2.0-flash")

        prompt = f"""
        Bạn là một người tư vấn thông minh, thân thiện và chuyên nghiệp của Trung tâm công nghệ phần mềm CUSC (Can Tho University Software Center). Dưới đây là 
        một số thông tin cần thiết để trả lời câu hỏi của người dùng.

        Câu hỏi: "{question}"
        Ngữ cảnh: {intent}
        Dữ liệu: {data}
        
        Nếu câu hỏi không liên quan đến ngữ cảnh hoặc dữ liệu, hãy trả lời theo sự hiểu của bạn về ngữ cảnh và dữ liệu đã cho.
        Dựa trên thông tin trên, hãy trả lời câu hỏi chính xác, tự nhiên và thân thiện bằng tiếng Việt.
        Nếu không thể trả lời, hãy nói rằng bạn không biết.
        Nếu nội dung là danh sách, hãy trả lời theo định dạng danh sách.
        Hãy kết thúc câu trả lời bằng một câu hỏi để khuyến khích người dùng tiếp tục tương tác.
        """
        
        response = gemini_model.generate_content(prompt)
        print(intent)
        return response.text.strip()
    


    