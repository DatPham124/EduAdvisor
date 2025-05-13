# NLU

Sử dụng Rasa open source, phiên bản 3.6.21

### Cách cài đặt Rasa

- Tạo môi trường ảo với python (Các phiên bản python phù hợp là 3.8, 3.9, 3.10), hiện phiên bản python được sử dụng để tạo dự án trên là 3.8.20

```
python3.8 -m venv .venv
```

- Cài đặt Rasa và transformer, torch

```
    pip install rasa
    pip install transformers torch
```

### Cách sử dụng Rasa

Theo đường dẫn, NLU/project

- File domain.yml, sẽ chứ các khai báo như intnet (ý định), các câu trả lời (utter), có thể viết thêm các action tùy ý
- config.yml sẽ là nơi cấu hình từng bước (pipeline), phân tích câu hỏi của người dùng để xác định được intent.

- Trong các file trong thư mục data có chức năng như sau:

  - nlu.yml: dùng để train mô hình, giúp mô hình nhận biết được các intent trong câu hỏi của người dùng

  - flows.yml: dùng để mô tả, lập kế hoạch cho 1 tình huống hội thoại nhất định, có thể ghi nhận các chi tiết trong câu trả lời của người dùng (VD: Tôi muốn gửi 100k, Chatbot sẽ lưu lại 100K và thực hiện hỏi câu kế tiếp theo cài đặt như là "Bạn muốn gửi 100k cho ai").

  - stories.yml: Được sử dụng để huấn luyện Rasa về cách chatbot nên xử lý các kịch bản cuộc trò chuyện

  - rules.yml: Định nghĩa các quy tắc cụ thể về cách chatbot nên phản hồi trong các tình huống nhất định. Các quy tắc này sẽ rõ ràng và có thể thay thế stories khi muốn chatbot hoạt động theo các quy tắc xác định, thay vì dựa vào các câu chuyện phức tạp (Như là người dùng nói chào thì chào lại, mặc dù có thể tình huống đó đang ở trong 1 stories)

  - Trong thư mục results là kết quả test mô hình, hiện tại nó có kết quả rất xấu

### Lệnh để chạy

- Train mô hình, mô hình được lưu trogn thư mục /models sau mỗi lần train

```
rasa train

```

- Chạy mô hình qua dòng lệnh

```
rasa shell
```

- Lệnh để test, chưa có vì đang tìm hiểu

Trong thư mục NLU/tutorial là cái hướng dẫn từ Rasa, coi trong đó chuẩn hơn
