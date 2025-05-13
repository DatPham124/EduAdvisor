from transformers import AutoTokenizer, AutoModel

# Kiểm tra xem mô hình có được tải thành công không
try:
    model_name = "vinai/phobert-base"
    print(f"Downloading model {model_name}...")
    tokenizer = AutoTokenizer.from_pretrained(model_name)
    model = AutoModel.from_pretrained(model_name)
    print("Model downloaded successfully!")
except Exception as e:
    print(f"Error downloading model: {e}")
