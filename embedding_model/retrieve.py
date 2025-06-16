from connect_qdrant import get_qdrent_client
from model import encode_query
from qdrant_client import models

def retrieve_context_from_qdrant(
    query: str,
    category_filter: str = None,
    #originals_filter: str = None, # Không còn cần lọc trên Originals nếu nó là nội dung chính
    subcategory_filter: str = None, # Giữ lại nếu bạn có SubCategoryTitle
    limit: int = 10
) -> str:
    """
    Truy xuất các tài liệu liên quan từ Qdrant và định dạng chúng thành một chuỗi ngữ cảnh
    để sử dụng với LLM (ví dụ: Gemini), với Originals là trường chứa nội dung chính.

    Args:
        query (str): Câu hỏi của người dùng.
        category_filter (str, optional): Lọc theo giá trị của trường 'Category'. Mặc định là None.
        subcategory_filter (str, optional): Lọc theo giá trị của trường 'SubCategoryTitle'. Mặc định là None.
        limit (int, optional): Số lượng tài liệu hàng đầu muốn truy xuất. Mặc định là 5.

    Returns:
        str: Một chuỗi chứa nội dung của các tài liệu liên quan, được định dạng làm ngữ cảnh.
             Nếu không tìm thấy tài liệu, sẽ trả về một chuỗi thông báo.
    """
    client = get_qdrent_client()
    query_vector = encode_query([query])[0].tolist()

    qdrant_filter = None
    must_conditions = []

    if category_filter:
        must_conditions.append(
            models.FieldCondition(
                key="Category",
                match=models.MatchValue(value=category_filter)
            )
        )
    # Nếu bạn có trường SubCategoryTitle trong payload, hãy giữ lại phần này
    if subcategory_filter:
        must_conditions.append(
            models.FieldCondition(
                key="SubCategoryTitle",
                match=models.MatchValue(value=subcategory_filter)
            )
        )
    
    if must_conditions:
        qdrant_filter = models.Filter(must=must_conditions)

    hits = client.search(
        collection_name="EduAdvisor",
        query_vector=query_vector,
        limit=limit,
        with_payload=True,
        query_filter=qdrant_filter
    )

    context_parts = []
    if not hits:
        return "No relevant information found in the knowledge base."

    for i, hit in enumerate(hits):
        # Lấy nội dung chính từ trường 'Originals'
        document_content = hit.payload.get('Originals', 'N/A')
        category = hit.payload.get('Category', 'N/A')
        # Nếu có SubCategoryTitle, bạn có thể thêm vào đây
        # subcategory_title = hit.payload.get('SubCategoryTitle', 'N/A')

        context_parts.append(
            f"--- Document {i+1} (Score: {hit.score:.4f}) ---\n"
            f"Content: {document_content}\n"
            f"Category: {category}\n"
            # f"SubCategory: {subcategory_title}\n" # Thêm vào nếu có
            "---------------------------\n"
        )
    
    return "\n".join(context_parts)