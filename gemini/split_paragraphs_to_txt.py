import os
import re
import dotenv
from google import genai
from google.genai import types
from unidecode import unidecode
import sys
import subprocess
import shutil


import filetype

if sys.platform == "win32":
    try:
        import win32com.client
        print("Đã import win32com")
    except ImportError:
        print("win32com chưa được cài, tiến hành cài đặt...")
        subprocess.check_call([sys.executable, "-m", "pip", "install", "pywin32"])



api_key = dotenv.get_key(dotenv.find_dotenv(), "GEMINI_API_KEY")
client = genai.Client(api_key=api_key)

input_dir = "input_pdfs"
output_root = "../gemini/documents/tuyen_sinh/cho_ban_nganh"
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

Các phần chú thích, ghi chú, hướng dẫn sử dụng và mục lục.

Chia nội dung thành các đoạn ngắn

Mỗi đoạn không quá 256 tokens

Mỗi đoạn phải có một tiêu đề mô tả nội dung chính ngắn gọn, không quá 8 từ.

Tiêu đề phải là tiếng Việt, không sử dụng tiếng Anh hoặc các ngôn ngữ khác.

Sau mỗi tiêu đề sẽ là dấu hai chấm ":" và nội dung mô tả.

Nội dung miêu tả của mỗi đoạn phải thể hiện trọn vẹn một ý, có ngữ cảnh rõ ràng, không cắt ngang ý chính.

Xử lý bảng

Nếu có bảng dữ liệu, hãy diễn giải lại thành đoạn văn đầy đủ theo dòng và liệt kê theo dạng danh sách các mục trong bảng.

Trình bày bằng câu hoàn chỉnh, rõ ràng, dễ hiểu.

Nhấn mạnh các nội dung quan trọng như: danh mục, mức phí, điều kiện, thời gian...

Tối ưu cho tìm kiếm vector

Sử dụng ngôn ngữ rõ ràng, trung tính, giàu từ khóa.

Tránh từ ngữ mơ hồ, dư thừa, trùng lặp.

Đảm bảo mỗi đoạn có thể hiểu được khi tách độc lập.

Định dạng đầu ra: 

Các đoạn văn bản sẽ được định dạng như sau: "Tiêu đề chính: Nội dung mô tả của đoạn"

Mỗi đoạn sẽ cách nhau bằng cách xuống dòng 

Không đưa lại bất kỳ phần nào đã yêu cầu loại bỏ.

Không thêm phần mở đầu, kết luận, hoặc giải thích ngoài nội dung chính.

Chú ý hạn chế viết tắt như HS-SV là học sinh-sinh viên

Chỉ xuất kết quả theo đúng yêu cầu trên. Không thêm bất kỳ bình luận hoặc lời giải thích nào.

Hãy chuyển sang tiếng Việt nếu file pdf không phải

Nếu chuyển từ file excel sang pdf thì chuyển theo dòng và liệt kê theo dạng danh sách các mục trong bảng
"""


def generate_respone(prompt ,file_path, filename):

    print(f"Đang xử lý: {filename}")

    upload_pdf = client.files.upload(file=file_path)

    response = client.models.generate_content(
            model="gemini-2.5-flash",
            contents=[upload_pdf, 
                      "\n\n",
                      prompt],
            config=types.GenerateContentConfig(
                temperature=0.3,
                top_p=0.5,
                top_k=1,
                thinking_config=types.ThinkingConfig(include_thoughts=False)
            )
        )
    
    return response



def create_file_name(sentence, file_name):
    # title = sentence.split("\n")[0]  # Lấy dòng đầu tiên làm tiêu đề
    # fname = unidecode(title.strip())
    # fname = re.sub(r'[\\/*?:"<>|]', "", fname).replace(" ", "_")
    # bỏ đuôi .pdf
    file_name = os.path.splitext(file_name)[0]
    fname = f"{output_root}/{file_name}.txt"
    with open(fname, "w", encoding="utf-8") as f:
        f.write(sentence.strip())


def convert_excel_to_pdf_in_linux(file):
    subprocess.run(['libreoffice', '--headless', '--convert-to', 'pdf:calc_pdf_Export:{"SinglePageSheets":{"type":"boolean","value":"false"}}',
                f'{input_dir}/{file}', '--outdir', 'input_pdfs'])
    base_filename = os.path.splitext(file)[0]
    output_file_name = f"{base_filename}.pdf"
    return output_file_name

def convert_docx_to_pdf_in_wins(file_path):
    file_path = os.path.abspath(file_path)
    if not os.path.exists(file_path):
        print(f"File không tồn tại: {file_path}")
        return None

    word = win32com.client.Dispatch("Word.Application")
    word.Visible = False
    doc = None

    try:
        doc = word.Documents.Open(file_path)
        output_path = os.path.splitext(file_path)[0] + ".pdf"
        doc.SaveAs(output_path, FileFormat=17)  # 17 = wdFormatPDF
        print(f"Đã chuyển: {file_path} -> {output_path}")
        return os.path.basename(output_path)
    except Exception as e:
        print(f"Lỗi khi chuyển file Word: {e}")
        return None
    finally:
        if doc is not None:
            doc.Close(False)
        word.Quit()


def convert_excel_to_pdf_in_wins(file_path):
    file_path = os.path.abspath(file_path)

    if not os.path.exists(file_path):
        print(f"File không tồn tại: {file_path}")
        return None

    excel = win32com.client.Dispatch("Excel.Application")
    excel.Visible = False
    wb = None 

    try:
        wb = excel.Workbooks.Open(file_path)

        output_path = os.path.splitext(file_path)[0] + ".pdf"

        wb.ExportAsFixedFormat(0, output_path)
        print(f"Đã chuyển: {file_path} -> {output_path}")

        return os.path.basename(output_path)

    except Exception as e:
        print(f"Lỗi khi mở hoặc chuyển file: {e}")
        return None

    finally:
        if wb is not None:
            wb.Close(False)
        excel.Quit()



def main():
    for root, _, files in os.walk(input_dir):
        for filename in files:
            path_file = os.path.join(root, filename)

            # Lấy đường dẫn tương đối từ input_dir
            relative_path = os.path.relpath(root, input_dir)

            kind = filetype.guess(path_file)
            if kind is None:
                print(f"Không xác định được định dạng: {filename}")
                continue

            ext = kind.extension
            category = kind.mime.split("/")[0]

            # Convert Excel nếu cần
            if sys.platform == "linux":
                if ext in ["xlsx", "xls", "xlsm", "xlsb", "csv"]:
                    filename = convert_excel_to_pdf_in_linux(filename)
                    path_file = os.path.join(input_dir, filename)

            if sys.platform == "win32":
                if ext in ["xlsx", "xls", "xlsm", "xlsb", "csv"]:
                    filename = convert_excel_to_pdf_in_wins(path_file)
                    if filename is None:
                        continue
                    path_file = os.path.join(input_dir, filename)
                elif ext in ["docx", "doc"]:
                    filename = convert_docx_to_pdf_in_wins(path_file)
                    if filename is None:
                        continue
                    path_file = os.path.join(input_dir, filename)

            if category == "image" and ext not in ["jpg", "png", "webp"]:
                print(f"Định dạng hình ảnh không phù hợp: {filename}")
                continue

            response = generate_respone(prompt, path_file, filename)
            output_text = response.text
            create_file_name(output_text, filename)

            if os.path.exists(path_file):
                os.remove(path_file)
                print(f"[🗑️] Đã xoá file: {path_file}")


if __name__ == "__main__":
    main()