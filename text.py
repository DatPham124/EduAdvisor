from transformers import AutoTokenizer, AutoModel
import torch

tokenizer = AutoTokenizer.from_pretrained("vinai/phobert-base")
model = AutoModel.from_pretrained("vinai/phobert-base")

text = "Tôi yêu trí tuệ nhân tạo"
tokens = tokenizer(text, return_tensors="pt")
with torch.no_grad():
    outputs = model(**tokens)


