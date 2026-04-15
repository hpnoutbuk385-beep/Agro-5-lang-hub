import os
from dotenv import load_dotenv
import google.generativeai as genai

# Path logic
current_dir = os.path.dirname(os.path.abspath(__file__))
env_path = os.path.join(current_dir, 'backend', '.env')
load_dotenv(env_path)

key = os.getenv("GEMINI_API_KEY")

try:
    genai.configure(api_key=key)
    # We will try the 2.0-flash model which appeared in user's logs
    model = genai.GenerativeModel("gemini-2.0-flash")
    print("Testing connection with gemini-2.0-flash...")
    response = model.generate_content("Dala so'zini inglizchaga tarjima qil")
    print(f"DEBUG: Response Success: {response.text[:50]}...")
except Exception as e:
    print(f"DEBUG: CONNECTION FAILED: {e}")
