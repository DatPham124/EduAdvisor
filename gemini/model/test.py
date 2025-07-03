import json
import requests
import time

API_URL = "http://localhost:5000/chat"
INPUT_FILE = "test_questions.json"

def main():
    with open(INPUT_FILE, "r", encoding="utf-8") as f:
        questions = json.load(f)

    for idx, question in enumerate(questions, 1):
        payload = {
            "question": question,
            "user_info": "",  # bạn có thể thay bằng thông tin người dùng nếu có
            "history": []     # nếu có hội thoại trước thì đưa vào
        }

        try:
            response = requests.post(API_URL, json=payload)
            response.raise_for_status()
            data = response.json()
            answer = data.get("answer", "")
            print(f"[{idx}] Câu trả lời: {answer[:10]}")

        except Exception as e:
            print(f"[Lỗi] Không gửi được câu hỏi: {e}")
            continue

        time.sleep(20)  # Delay nhẹ giữa các yêu cầu nếu cần

if __name__ == "__main__":
    main()
