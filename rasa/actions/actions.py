from typing import Any, Text, Dict, List
from rasa_sdk import Action, Tracker
from rasa_sdk.executor import CollectingDispatcher
from qdrant_client.models import Filter, FieldCondition, MatchValue


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

        response = self.search_from_vector_model(user_message, intent_name)

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
            print(hit[0].payload["Category"])
            return hit[0].payload["Originals"]
        
        except Exception as e:
            return (f"Có lỗi: {e}")

    