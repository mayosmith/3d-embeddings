import openai
import numpy as np


# Set your OpenAI API key
openai.api_key = '[YOUR-API-KEY-HERE]'

# Function to get embeddings for a list
def get_embeddings(texts, engine="text-embedding-3-large"):
    response = openai.Embedding.create(
        input=texts,
        engine=engine,
        dimensions=3
    )
    return [embedding['embedding'] for embedding in response['data']]

# Function to compute cosine similarity between two vectors
def cosine_similarity(vec1, vec2):
    return np.dot(vec1, vec2) / (np.linalg.norm(vec1) * np.linalg.norm(vec2))

# Sample Words and Phrases
s = [  
"apple",
"lemon",
"horse",
"hammer",     
"pie crust", 
"hangs from a branch",
"given to teachers",
"crushed ice",
"cinnamon"
]

# Get embeddings for the sentences
embeddings = get_embeddings([s[0], s[1], s[2], s[3], s[4], s[5], s[6], s[7], s[8]])

# Compute and print the cosine similarity
similarity = cosine_similarity(embeddings[0], embeddings[8])
print(f"Similarity between first and last phrases: {similarity}")


for i in range(9):
    print(f"{s[i]}, {embeddings[i]}")


