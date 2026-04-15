import os
import json
import re
from ..config import settings

# Try to initialize the Gemini client (new or legacy)
_client = None
_legacy_model = None

try:
    from google import genai as genai_client
    from google.genai import types
    if settings.GEMINI_API_KEY:
        _client = genai_client.Client(api_key=settings.GEMINI_API_KEY)
except Exception as e:
    _client = None

if _client is None:
    try:
        import google.generativeai as genai
        if settings.GEMINI_API_KEY:
            genai.configure(api_key=settings.GEMINI_API_KEY)
            # Use gemini-2.0-flash as it is the most responsive for this key
            _legacy_model = genai.GenerativeModel("gemini-2.0-flash")
    except Exception as e:
        _legacy_model = None

def translate_term(word: str, source_lang: str):
    """
    Translates a word into: uz, en, kr, jp, ru using the most responsive Gemini model.
    """
    prompt = f"""
    Translate the following agricultural/laboratory term into 5 languages: 
    Uzbek (uz), English (en), Karakalpak (kr), Japanese (jp), and Russian (ru).
    
    Input: "{word}" (Source Language: {source_lang})
    
    Return ONLY a valid JSON object with the following keys: "meaning_uz", "meaning_en", "meaning_kr", "meaning_jp", "meaning_ru".
    Lowercase the results.
    """
    
    try:
        # Use verified model name for this user environment
        model_name = "gemini-2.0-flash"
        
        if _client is not None:
            response = _client.models.generate_content(
                model=model_name,
                contents=prompt,
                config=types.GenerateContentConfig(
                    response_mime_type="application/json",
                ),
            )
            raw = (response.text or "").strip()
        elif _legacy_model is not None:
            # Use initialized legacy model
            response = _legacy_model.generate_content(
                prompt,
                generation_config={"response_mime_type": "application/json"}
            )
            raw = (response.text or "").strip()
        else:
            print("Translation Error: No Gemini client initialized.")
            return None
        
        if not raw:
            print("Translation Error: Empty response from Gemini.")
            return None

        # Parse JSON
        try:
            translations = json.loads(raw)
        except json.JSONDecodeError:
            m = re.search(r"\{[\s\S]*\}", raw)
            if not m:
                print(f"Translation Error: No JSON found in response.")
                return None
            translations = json.loads(m.group(0))

        if not isinstance(translations, dict):
            return None

        # Clean keys
        required_keys = ("meaning_uz", "meaning_en", "meaning_kr", "meaning_jp", "meaning_ru")
        for k in required_keys:
            if k not in translations:
                translations[k] = ""

        return translations
    except Exception as e:
        err_msg = str(e)
        if "429" in err_msg or "RESOURCE_EXHAUSTED" in err_msg:
            print("CRITICAL: Gemini Quota Exhausted.")
            return {"error": "quota"}
        print(f"Gemini API Error: {e}")
        return None
