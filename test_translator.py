import os
import sys
import json

# Add backend to sys.path
sys.path.append(os.path.join(os.getcwd(), 'backend'))

try:
    from backend.app.utils.translator import translate_term
    from backend.app.config import settings
    
    print(f"Testing with API Key: {settings.GEMINI_API_KEY[:10]}...")
    
    result = translate_term("dala", "uz")
    if result:
        print("Success!")
        print(json.dumps(result, indent=2))
    else:
        print("Failed: Result is None")
except Exception as e:
    print(f"Error occurred: {e}")
    import traceback
    traceback.print_exc()
