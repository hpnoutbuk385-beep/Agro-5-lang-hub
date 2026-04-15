import os
from pydantic_settings import BaseSettings
from dotenv import load_dotenv

load_dotenv()

class Settings(BaseSettings):
    PROJECT_NAME: str = "Agro 5 Lab Hub"
    API_V1_STR: str = "/api/v1"
    GEMINI_API_KEY: str = os.getenv("GEMINI_API_KEY", "")
    DATABASE_URL: str = os.getenv("DATABASE_URL", "sqlite:///./agro_lang_hub.db")

    class Config:
        case_sensitive = True

settings = Settings()
