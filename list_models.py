import os
import google.generativeai as genai
from backend.app.config import settings

def list_models():
    try:
        genai.configure(api_key=settings.GEMINI_API_KEY)
        print("Available models:")
        for m in genai.list_models():
            if 'generateContent' in m.supported_generation_methods:
                print(f" - {m.name}")
    except Exception as e:
        print(f"Error listing models: {e}")

if __name__ == "__main__":
    list_models()
