# CHATBOT AI USING GEMINI API 2.0 - Version 2.0  

>  Đề xuất dùng Python từ version 3.8 trở lên. Hiện dự án đang dùng Python 3.8  
>  Thư mục gốc thực thi là thư mục ./gemini

### **Bước 1: Chuẩn bị môi trường để thực thi**


**1. Chuẩn bị Gemini API**

- Ở thư mục gốc, tạo file `.env` dựa trên file `example.env`

- Xem hướng dẫn lấy Gemini API key tại [Gemini API](https://ai.google.dev/gemini-api/docs)

- Copy API key và paste vào file `.env`    


**2. Chuẩn bị môi trường ảo và thư viện**

- Chạy lệnh lần lượt các lệnh để khởi tạo và chạy môi trường ảo:
```    
        python -m venv .venv
        .\.venv\Scripts\activate
```

- Cài đặt các thư viện cần thiết
```
        pip install -r requirements.txt
``` 

**3. Chuẩn bị dữ liệu**
```
        py .\add_documents.py
```

### **Bước 2: Chạy Chatbot**

- Di chuyển đển thư mục và thực thi file
```
        py .\model\app.py
```
> Hãy đảm bảo port 5000 của bạn rảnh hoặc bạn phải điều chỉnh sang cổng khác nếu cần

### **Bước 3: Kiểm thử (OPTIONAL)**
**1. Chuẩn bị cho việc ghi dữ liệu lên Google Sheet**
- Xem hướng dẫn lấy credentials của Google Sheet API [tại đây](https://www.analyticsvidhya.com/blog/2020/07/read-and-update-google-spreadsheets-with-python/)
> Lưu ý: File chứa credentials phải là `credentials.json`
- Cấp quyền chỉnh sửa file bạn muốn ghi cho tài khoản `client_email` trong file `credentials.json` 
- Mở file `.env` và thêm biến môi trường `GOOGLE_SHEET_ID`. Đây là ID của file Google Sheet mà bạn muốn lưu dữ liệu 
> Google Sheet ID nằm ở đường link truy cập đến file có định dạng như sau:  
> docs.google.com/spreadsheets/d/ + `GOOGLE_SHEET_ID` + /edit

**2. Test câu trả lời với bộ câu hỏi chuẩn bị sẵn**
- Tạo file `\model\test_questions.json` và lưu các câu hỏi cần để đánh giá thành dạng JSON 
> File chỉ nên chứa tối đa **250** câu do mô hình Gemini 2.5 Flash free chỉ đối đa 250 RPD
- Kiểm thử bằng cách chạy lệnh
```
        py .\model\test.py
```
> Đảm bảo bạn đã chạy `py .\model\app.py` trước khi tiến hành test
---


