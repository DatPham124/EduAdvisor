from connect_qdrant import get_qdrent_client
from model import encode_query
from test_cases import test_cases  

client = get_qdrent_client()
correct = 0
results = []

for idx, case in enumerate(test_cases):
    query = case["query"]
    expected_keywords = case["expected_keyword"]
    query_vector = encode_query([query])[0].tolist()

    hits = client.search(collection_name="EduAdvisor", query_vector=query_vector, limit=15)

    match_found = any(
        all(keyword in hit.payload.get('Originals', '') for keyword in expected_keywords)
        for hit in hits
    )

    if match_found:
        correct += 1
        status = "✅ Đúng"
    else:
        status = "❌ Sai"

    results.append({
        "index": idx + 1,
        "query": query,
        "expected_keywords": expected_keywords,
        "status": status,
        "top_3_result": [hit.payload.get("Originals", "") for hit in hits],
        "Category": [hit.payload.get("Category", "") for hit in hits]
    })


# In chi tiết các truy vấn sai
for result in results:
        print(f"Câu hỏi: {result['query']}")
        # print(f"  ➤ Kỳ vọng chứa: {result['expected_keywords']}")
        print(f"  ➤ Kết quả trả về:")
        for i, text in enumerate(result['top_3_result']):
            print(f"     {i+1}. {text[:150]}...")
        print(result['Category'])
        print("-" * 60)
