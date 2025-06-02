import numpy as np 

def normalize_vector(vec):
    norm = np.linalg.norm(vec)
    if norm == 0:
        return vec
    
    return vec/norm