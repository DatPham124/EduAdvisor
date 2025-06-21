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
for root, dirs, files in os.walk(folder_path):
    for filename in files:
        if filename.endswith(".txt"):
            filepath = os.path.join(root, filename)

            with open(filepath, "r", encoding="utf-8") as file:
                content = file.read()

            # kết hợp tên file và folder
            relative_path = os.path.relpath(filepath, folder_path)            
            parts = os.path.splitext(relative_path)[0].split(os.sep)          
            intent = "_".join(parts)                                           

            document = {
                "_id": ObjectId(),
                "_intent": intent,
                "content": content
            }

            collection.insert_one(document)
            print(f"Đã thêm: {filepath}")