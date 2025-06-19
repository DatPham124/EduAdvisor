import os
from pymongo import MongoClient
from bson.objectid import ObjectId

# Kết nối MongoDB
client = MongoClient("mongodb://localhost:27017/")

# Chọn database và collection
db = client["eduadvisor"] 
collection = db["documents"]

# Xóa toàn bộ documents cũ trong collection
collection.delete_many({})
print("Đã xóa toàn bộ document trong collection 'eduadvisor'.")

# Thư mục chứa các file .txt
folder_path = "documents"

# Duyệt qua từng file .txt và thêm lại
for filename in os.listdir(folder_path):
    if filename.endswith(".txt"):
        filepath = os.path.join(folder_path, filename)
        with open(filepath, "r", encoding="utf-8") as file:
            content = file.read()

        document = {
            "_id": ObjectId(),  # Hoặc để MongoDB tự sinh cũng được
            "_intent": os.path.splitext(filename)[0],
            "content": content
        }

        collection.insert_one(document)
        print(f"Đã thêm: {filename}")
