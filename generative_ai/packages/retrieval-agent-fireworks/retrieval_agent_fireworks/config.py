import os
from dotenv import load_dotenv

load_dotenv()

class Settings:
    FIREWORKS_API_KEY: str = os.getenv("FIREWORKS_API_KEY")
    COHERE_API_KEY: str = os.getenv("COHERE_API_KEY")
    PINECONE_API_KEY: str = os.getenv("PINECONE_API_KEY")
    TAVILY_API_KEY: str = os.getenv("TAVILY_API_KEY")

settings = Settings()
