import numpy as np

from .normalize_vector import normalize_vector
from transformers import AutoTokenizer

from sentence_transformers import SentenceTransformer

model = SentenceTransformer('VoVanPhuc/sup-SimCSE-VietNamese-phobert-base')

tokenizer = AutoTokenizer.from_pretrained('VoVanPhuc/sup-SimCSE-VietNamese-phobert-base')


max_token = tokenizer.model_max_length

embedding_dim = model.get_sentence_embedding_dimension


def get_max_token():
    return max_token

def get_token():
    return tokenizer


def encode_data(sentences, model = model):

    embeddings = model.encode(sentences)

    normalize = normalize_vector(embeddings)

    return normalize



def encode_query(query, model = model):

    embeddings = model.encode(query)

    normalize = normalize_vector(embeddings)

    return normalize





