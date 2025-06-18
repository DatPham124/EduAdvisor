# CHATBOT AI USING GEMINI API 2.0 - Version 2.0  

> *Updated date: 06/17/25*

#### *Đề xuất dùng Python từ version 3.8 trở lên. Hiện dự án đang dùng Python 3.8*  


**Bước 1: Chuẩn bị môi trường để thực thi**


1. Chuẩn bị Gemini API

- Ở thư mục gốc, tạo file `.env` dựa trên file `example.env`

- Xem hướng dẫn lấy Gemini API key tại [Gemini API](https://ai.google.dev/gemini-api/docs)

- Copy API key và paste vào file `.env`


2. Chuẩn bị môi trường ảo (Terminal trên Windows)

- Chạy lệnh lần lượt các lệnh để khởi tạo và chạy môi trường ảo
```    
        python -m venv .venv
        .\.venv\Scripts\activate
```


**Bước 2: Sử dụng Chatbot trên Terminal (TEST)**


- Di chuyển đển thư mục và thực thi file
```
        cd .\model\ 
        (set up: pip install dotenv google-generativeai flask)
        py .\main.py  or py .\app.py      
```
**Thêm documents vào mongoDB**
```
        pip install pymongo
        py add_documents.py
```
---

# TO DO LIST  

✅ **ĐÃ HOÀN THÀNH:** 
1. Lưu cache cuộc hội thoại 

❗ **ĐANG XỬ LÝ:** 
1. Lưu LOG Q&A:  
        Dữ liệu sẽ mở rộng rất lớn, chưa tối ưu được  
        Gemini giới hạn token nên không thể gửi hết được  
        Không cập nhật được các câu trả lời của quá khứ  
        ...

---
# BẢNG CÁC DỮ LIỆU CHƯA LÀM SẠCH

|  DATA                         | DONE|
|-------------------------------|-----|
| **Khóa học APTECH**           |☐|
| **Khóa học ARENA**            |☐|
| **Khóa học ACNPro**           |☐|
| **Khóa đào tạo theo yêu cầu** |☐|

