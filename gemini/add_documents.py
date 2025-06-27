import os
from pymongo import MongoClient
from bson.objectid import ObjectId

domain = "tuyen_sinh"  #tên thư mục trong documents/

# Kết nối MongoDB
client = MongoClient("mongodb://localhost:27017/")
db = client["eduadvisor"]
collection = db["documents"]

# Xóa tài liệu cũ theo domain
delete_result = collection.delete_many({"domain": domain})
print(f"Đã xóa {delete_result.deleted_count} documents có domain '{domain}'.")

# Đường dẫn thư mục gốc cần duyệt
folder_path = os.path.join("documents", domain)

# Duyệt và xử lý từng file
for root, dirs, files in os.walk(folder_path):
    for filename in files:
        if filename.endswith(".txt"):
            filepath = os.path.join(root, filename)

            with open(filepath, "r", encoding="utf-8") as file:
                content = file.read()

            # Tên intent: lấy từ tên file (không kèm .txt)
            intent = os.path.splitext(filename)[0]

            # Phân tích đường dẫn tương đối
            relative_path = os.path.relpath(filepath, folder_path)
            parts = relative_path.split(os.sep)  # ví dụ: ['chuong_trinh_dao_tao', 'dao_tao_theo_yeu_cau', 'cac_khoa_dao_tao_danh_cho_doanh_nghiep', 'khoa_hoc.txt']

            # Khởi tạo document cơ bản
            document = {
                "_id": ObjectId(),
                "_intent": intent,
                "domain": domain,
                "content": content
            }

            # Gán subdomain nếu có
            if len(parts) >= 2:
                document["subdomain"] = parts[0]  # ví dụ: 'dao_tao_theo_yeu_cau'

            # Gán topic nếu có folder cấp 4
            if len(parts) >= 3:
                document["topic"] = parts[1]  # ví dụ: 'cac_khoa_dao_tao_danh_cho_doanh_nghiep'

            collection.insert_one(document)
            print(f"Đã thêm: {filepath}")
