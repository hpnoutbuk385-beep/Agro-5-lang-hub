import os
import json
import re
from ..config import settings

_client = None
_legacy_model = None

try:
    from google import genai as genai_client  # type: ignore
    from google.genai import types  # type: ignore

    if settings.GEMINI_API_KEY:
        _client = genai_client.Client(api_key=settings.GEMINI_API_KEY)
except Exception:
    _client = None

if _client is None:
    try:
        import google.generativeai as genai  # type: ignore

        if settings.GEMINI_API_KEY:
            genai.configure(api_key=settings.GEMINI_API_KEY)
            _legacy_model = genai.GenerativeModel("gemini-1.5-flash")
    except Exception:
        _legacy_model = None

def translate_term(word: str, source_lang: str):
    """
    Translates a word into: uz, en, kr (kaa), jp.
    """
    prompt = f"""
    Translate the following agricultural/laboratory term into 4 languages: 
    Uzbek (uz), English (en), Karakalpak (kr), and Japanese (jp).
    
    Input: "{word}" (Source Language: {source_lang})
    
    Return ONLY a valid JSON object with the following keys: "meaning_uz", "meaning_en", "meaning_kr", "meaning_jp".
    Lowercase the results.
    """
    
    try:
        if _client is not None:
            response = _client.models.generate_content(
                model="gemini-2.0-flash",
                contents=prompt,
                config=types.GenerateContentConfig(
                    response_mime_type="application/json",
                ),
            )
        elif _legacy_model is not None:
            response = _legacy_model.generate_content(
                prompt,
                generation_config=genai.types.GenerationConfig(
                    response_mime_type="application/json",
                ),
            )
        else:
            return None
        
        raw = (response.text or "").strip()
        if not raw:
            return None

        try:
            translations = json.loads(raw)
        except json.JSONDecodeError:
            m = re.search(r"\{[\s\S]*\}", raw)
            if not m:
                return None
            translations = json.loads(m.group(0))

        if not isinstance(translations, dict):
            return None

        # Ensure all keys exist
        for k in ("meaning_uz", "meaning_en", "meaning_kr", "meaning_jp"):
            if k not in translations:
                translations[k] = ""

        return translations
    except Exception as e:
        print(f"Error calling Gemini: {e}")
        return None
