from qdrant_client.models import PointStruct
from connect_qdrant import get_qdrent_client


def insert_qdrant(vector ,category, originals_sentences, idx):
   client = get_qdrent_client()
   try:
         if   client.upsert(
            collection_name="EduAdvisor",
            points=[
               PointStruct(
                     id=idx,
                     vector=vector.tolist(),
                     payload={"Category": category, "Originals": originals_sentences}
               )
            ]
         ):
            print(f"Đã đẩy dữ liệu file {category} câu lên Qdrant.")

   except Exception as e:
      print(f"Lỗi: {e}")
      
      