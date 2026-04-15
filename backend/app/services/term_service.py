from sqlalchemy.orm import Session
from sqlalchemy import func
from ..models.term import Term
from ..utils.translator import translate_term

def get_term_by_word(db: Session, word: str, lang: str = None):
    word_lower = word.lower()
    
    if lang:
        # Map lang code to model column
        col_map = {
            "uz": Term.meaning_uz,
            "en": Term.meaning_en,
            "ru": Term.meaning_ru,
            "kr": Term.meaning_kr,
            "jp": Term.meaning_jp
        }
        col = col_map.get(lang)
        if col:
            return db.query(Term).filter(func.lower(col) == word_lower).first()

    # General search across all language fields
    return db.query(Term).filter(
        (func.lower(Term.word) == word_lower) |
        (func.lower(Term.meaning_uz) == word_lower) |
        (func.lower(Term.meaning_en) == word_lower) |
        (func.lower(Term.meaning_ru) == word_lower) |
        (func.lower(Term.meaning_kr) == word_lower) |
        (func.lower(Term.meaning_jp) == word_lower)
    ).first()

def search_terms(db: Session, query: str, limit: int = 20):
    q = f"%{query.lower()}%"
    return db.query(Term).filter(
        (func.lower(Term.word).like(q)) |
        (func.lower(Term.meaning_uz).like(q)) |
        (func.lower(Term.meaning_en).like(q)) |
        (func.lower(Term.meaning_ru).like(q)) |
        (func.lower(Term.meaning_kr).like(q)) |
        (func.lower(Term.meaning_jp).like(q))
    ).limit(limit).all()

def create_or_translate_term(db: Session, word: str, source_lang: str):
    # 1. Check if exists
    existing = get_term_by_word(db, word, source_lang)
    if existing:
        return existing, "database"

    # 2. Translate using AI
    translations = translate_term(word, source_lang)
    if isinstance(translations, dict) and translations.get("error") == "quota":
        return None, "quota"
    
    if not translations:
        return None, "error"

    # 3. Save to DB
    new_term = Term(
        word=word,
        meaning_uz=translations.get("meaning_uz", ""),
        meaning_en=translations.get("meaning_en", ""),
        meaning_ru=translations.get("meaning_ru", ""),
        meaning_kr=translations.get("meaning_kr", ""),
        meaning_jp=translations.get("meaning_jp", ""),
        category="general"
    )
    db.add(new_term)
    db.commit()
    db.refresh(new_term)
    return new_term, "ai"
