import os
import sys
from dotenv import load_dotenv

# Path logic
current_dir = os.path.dirname(os.path.abspath(__file__))
env_path = os.path.join(current_dir, 'backend', '.env')
load_dotenv(env_path)

key = os.getenv("GEMINI_API_KEY")

print(f"DEBUG: Found API Key: {key[:10]}... if it exists")

try:
    import google.generativeai as genai
    genai.configure(api_key=key)
    model = genai.GenerativeModel("gemini-1.5-flash")
    print("DEBUG: Library loaded. Testing connection...")
    response = model.generate_content("Hello")
    print(f"DEBUG: Response Success: {response.text[:20]}...")
except Exception as e:
    print(f"DEBUG: CONNECTION FAILED: {e}")
