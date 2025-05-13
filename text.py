import torch
from transformers import AutoTokenizer, AutoModelForMaskedLM
from typing import  List, Text
#Thư viện typing là một module chuẩn của Python được sử dụng để cung cấp kiểu dữ liệu tĩnh (type hints). 
# Đây là cách giúp Python xác định kiểu dữ liệu của các biến, tham số và giá trị trả về của các hàm/methods.

from rasa.engine.graph import GraphComponent
from rasa.engine.recipes.default_recipe import DefaultV1Recipe
from rasa.shared.nlu.training_data.message import Message

#Tin nhắn của người dùng sẽ được đóng gói trong Message này
#Trong đó sẽ có dữ liệu thuộc kiểu dir (như key:value), như là text, intent, confident, metadata
from rasa.shared.nlu.constants import TEXT
#Module trên chứa các hằng số quan trọng để dịnh danh các trường trong đối tượng Message
from rasa.shared.nlu.training_data.training_data import TrainingData





# TODO: Correctly register your component with its type
@DefaultV1Recipe.register(
    [DefaultV1Recipe.ComponentType.INTENT_CLASSIFIER], is_trainable=False #False ở đây sẽ chỉ chạy phàm process mà không chạy hàm train, là chỉ sử dụng chứ không train lại
)

class PhoBERT_NLP(GraphComponent):
    @classmethod
    def __init__(self, model_name: Text):
        self.device = torch.device("cuda" if torch.cuda.is_available() else "cpu")
        self.tokenizer = AutoTokenizer.from_pretrained(model_name)
        #Tokenizer công cụ chuyển đổi văn bản thành các token, tức là đơn vị nhỏ hơn như từ, ký tự hoặc từ ghép
        self.model = AutoModelForMaskedLM.from_pretrained(model_name) 


    def process(self, messages: List[Message]) -> List[Message]:
        for message in messages:
            text = message.get(TEXT)
            input = self.tokenizer(text, return_tensors="pt", padding=True, truncation=True).to(self.device)
            # return_tensors="pt" sẽ chuyển TokenId thành các tensor
            with torch.no_grad():
            # Cú pháp with là context manager, nó chạy các công việc trong khối với 1 ngữ cảnh nhất định

            # VD: 

            # file = open("example.txt", "r")                    with open("example.txt", "r") as file:
            # data = file.read()                    VÀ                  data = file.read()
            # file.close()

                outputs = self.model(**input)
            # Cú pháp ** chuyển từ kiểu dir ("key":"value") về thành các biến có giá trị 

            embeddings = outputs.last_hidden_state[:, 0, :].cpu().numpy()
            message.set("phobert_embedding", embeddings[0])
         
        return message
