import os
from pymongo import MongoClient
from bson.objectid import ObjectId

# === Đường dẫn thư mục gốc chứa các domain ===
base_folder = "documents"

# === Kết nối MongoDB ===
client = MongoClient("mongodb://localhost:27017/")
db = client["eduadvisor"]
collection = db["documents"]

# === Duyệt từng thư mục con trong documents/ và xử lý ===
for domain_name in os.listdir(base_folder):
    domain_path = os.path.join(base_folder, domain_name)

    # Bỏ qua nếu không phải thư mục
    if not os.path.isdir(domain_path):
        continue

    # Xoá các document cũ thuộc domain này
    delete_result = collection.delete_many({"domain": domain_name})
    print(f"🧹 Đã xóa {delete_result.deleted_count} documents của domain '{domain_name}'.")

    # Duyệt tất cả file .txt bên trong domain và các thư mục con
    for root, dirs, files in os.walk(domain_path):
        for filename in files:
            if filename.endswith(".txt"):
                filepath = os.path.join(root, filename)

                # Đọc nội dung file
                with open(filepath, "r", encoding="utf-8") as file:
                    content = file.read()

                # Intent lấy từ tên file (không có đuôi)
                intent = os.path.splitext(filename)[0]

                # Đường dẫn tương đối từ domain/
                relative_path = os.path.relpath(filepath, domain_path)
                parts = relative_path.split(os.sep)  # ví dụ: ['sub1', 'topic1', 'file.txt']

                # Tạo document
                document = {
                    "_id": ObjectId(),
                    "_intent": intent,
                    "domain": domain_name,
                    "content": content
                }

                # Gán subdomain nếu có thư mục cấp 1
                if len(parts) >= 2:
                    document["subdomain"] = parts[0]

                # Gán topic nếu có thư mục cấp 2
                if len(parts) >= 3:
                    document["topic"] = parts[1]

                # Lưu vào MongoDB
                collection.insert_one(document)
                print(f"✅ Đã thêm: {filepath}")
