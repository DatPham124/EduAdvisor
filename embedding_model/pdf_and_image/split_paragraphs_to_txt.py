import os
import re
import dotenv
from google import genai
from google.genai import types
from unidecode import unidecode

api_key = dotenv.get_key(dotenv.find_dotenv(), "GEMINI_API_KEY")
client = genai.Client(api_key=api_key)

# Thư mục chứa các file PDF
input_dir = "input_pdfs"
output_root = "output_data"
os.makedirs(output_root, exist_ok=True)

prompt = """
Bạn là một trợ lý AI chuyên nghiệp, có nhiệm vụ xử lý nội dung văn bản từ tài liệu PDF (đã OCR) để sử dụng làm dữ liệu cho hệ thống truy vấn ngữ nghĩa.

Yêu cầu xử lý như sau:

Loại bỏ các phần không cần thiết

Bỏ qua hoàn toàn các phần sau:

Quốc hiệu, tiêu ngữ (ví dụ: "CỘNG HÒA XÃ HỘI CHỦ NGHĨA VIỆT NAM...", "Độc lập - Tự do - Hạnh phúc").

Tiêu đề chính của văn bản hoặc thủ tục hành chính.

Ngày tháng ban hành, hiệu lực, mã số văn bản.

Căn cứ pháp lý, điều khoản dẫn chiếu, phạm vi áp dụng.

Thông tin người ký, chức danh, chữ ký (ví dụ: Giám đốc, Trưởng phòng...).

Chia nội dung thành các đoạn ngắn

Mỗi đoạn phải có một tiêu đề mô tả nội dung chính.

Mỗi đoạn không vượt quá 256 token.

Mỗi đoạn phải thể hiện trọn vẹn một ý, có ngữ cảnh rõ ràng, không cắt ngang ý chính.

Xử lý bảng

Nếu có bảng dữ liệu, hãy diễn giải lại thành đoạn văn đầy đủ.

Trình bày bằng câu hoàn chỉnh, rõ ràng, dễ hiểu.

Nhấn mạnh các nội dung quan trọng như: danh mục, mức phí, điều kiện, thời gian...

Tối ưu cho tìm kiếm vector

Sử dụng ngôn ngữ rõ ràng, trung tính, giàu từ khóa.

Tránh từ ngữ mơ hồ, dư thừa, trùng lặp.

Đảm bảo mỗi đoạn có thể hiểu được khi tách độc lập.

Định dạng đầu ra:

Đầu file sẽ là tên thư mục có liên quan đến nội dung không kèm theo định dạng 

Đoạn văn sẽ không có tiêu đề

Mỗi đoạn sẽ cách nhau bằng cách xuống dòng 

Trước mỗi đoạn văn sẽ là câu mô tả nội dung cho cả đoạn, phù hợp với việc vector hóa, câu mô tả sẽ phân biệt với nội dung bằng dấu :

Không đưa lại bất kỳ phần nào đã yêu cầu loại bỏ.

Không thêm phần mở đầu, kết luận, hoặc giải thích ngoài nội dung chính.

Chú ý hạn chế viết tắt như HS-SV là học sinh-sinh viên

Chỉ xuất kết quả theo đúng yêu cầu trên. Không thêm bất kỳ bình luận hoặc lời giải thích nào.
"""

# Lặp qua các file PDF trong thư mục input_pdfs
for filename in os.listdir(input_dir):
    if not filename.lower().endswith(".pdf"):
        continue

    pdf_path = os.path.join(input_dir, filename)
    print(f"Đang xử lý: {filename}")

    # Upload PDF lên Gemini
    upload_pdf = client.files.upload(file=pdf_path)

    # Gọi Gemini để xử lý nội dung
    response = client.models.generate_content(
        model="gemini-2.5-flash-preview-05-20",
        contents=[prompt, upload_pdf],
        config=types.GenerateContentConfig(
            temperature=0.3,
            top_p=0.5,
            top_k=1,
            thinking_config=types.ThinkingConfig(include_thoughts=False)
        )
    )

    output_text = response.text

    # Tạo tên thư mục từ dòng đầu tiên
    first_line = output_text.strip().splitlines()[0]
    folder_name = unidecode(first_line.strip())
    folder_name = re.sub(r'[\\/*?:"<>|]', "", folder_name)
    folder_name = folder_name.replace(" ", "_")
    full_output_dir = os.path.join(output_root, folder_name)
    os.makedirs(full_output_dir, exist_ok=True)

    # Bỏ dòng đầu và chia đoạn
    content_only = "\n".join(output_text.strip().splitlines()[1:])
    paragraphs = [p.strip() for p in content_only.split("\n\n") if p.strip()]

    # Ghi từng đoạn vào file .txt
    for para in paragraphs:
        if ':' not in para:
            continue
        title, content = para.split(":", 1)
        fname = unidecode(title.strip())
        fname = re.sub(r'[\\/*?:"<>|]', "", fname).replace(" ", "_")
        filepath = os.path.join(full_output_dir, f"{fname}.txt")
        with open(filepath, "w", encoding="utf-8") as f:
            f.write(para.strip())

    print(f"Đã lưu kết quả vào thư mục: {full_output_dir}\n")
