import os

# Thư mục chứa các file intent
intent_folder = "../documents"
output_file = "intent.txt"

# Lấy danh sách tên file (không bao gồm phần mở rộng .txt)
intent_names = [
    os.path.splitext(filename)[0]
    for filename in os.listdir(intent_folder)
    if filename.endswith(".txt")
]

# Ghi vào intent.txt, mỗi intent một dòng
with open(output_file, "w", encoding="utf-8") as f:
    for intent in intent_names:
        f.write(intent + "\n")

print(f"Đã ghi {len(intent_names)} intent vào {output_file}")
