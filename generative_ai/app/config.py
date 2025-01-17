import os
from dotenv import load_dotenv

load_dotenv()

class Settings:
    LANGSMITH_API_KEY: str = os.getenv("LANGSMITH_API_KEY")

settings = Settings()
