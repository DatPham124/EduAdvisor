from model import encode_data
from upsert_data import insert_qdrant
from split_chunk import split_chunk_for_vectorizer
import os 


def read_file_text(file_path):
    with open(file_path, "r", encoding="utf-8") as f:
        return f.read()



folder_path = "../documents"

files = [
    (os.path.splitext(f)[0], os.path.join(folder_path, f)) 
    for f in os.listdir(folder_path)
    if f.endswith(".txt") and os.path.isfile(os.path.join(folder_path, f))
]

idx = 0

for file_name, file_path in files:
    sentences = read_file_text(file_path)

    total_split_text = split_chunk_for_vectorizer(sentences)

    for split_text in total_split_text:

        embeddings = encode_data(split_text)

        insert_qdrant(embeddings, file_name, split_text, idx)
        idx += 1

