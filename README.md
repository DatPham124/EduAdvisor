# EduAdvisor
Hệ thống tư vấn tuyển sinh 

## Cài đặt

Để bắt đầu cài đặt Backend cho EduAdvisor, làm theo các bước sau:

1. Sao chép kho lưu trữ:

   ```bash
   git clone https://github.com/DatPham124/EduAdvisor.git [TEN_THU_MUC]
   ```

2. Di chuyển đến thư mục dự án:

   ```bash
   cd [TEN_THU_MUC]
   ```

3. Cài đặt tất cả các gói cần thiết:

   ```bash
   npm install
   ```

## Cấu hình

Trước khi chạy máy chủ, bạn cần cấu hình ứng dụng. Thực hiện các bước sau:

1. Tìm tệp `example.config.env` trong thư mục gốc của dự án.

2. Đổi tên tệp thành `config.env`.

3. Mở `config.env` và cập nhật các biến cấu hình cần thiết.

## Import dữ liệu

1. Điều chỉnh đường dẫn đến file dữ liệu và model muốn import dữ liệu

```bash
const model = require('[DUONG_DAN_DEN_FILE_MODEL]');
const file = '[DUONG_DAN_DEN_FILE_DATA]';
```
2. Chạy lệnh trên terminal để import dữ liệu:

```bash
npm run import
```

Lặp lại quá trình này nếu bạn có nhiều file data muốn import

## Khởi động máy chủ

Bây giờ sau khi cài đặt, cấu hình và import dữ liệu hoàn tất, bạn có thể khởi động máy chủ:

```bash
npm start
```