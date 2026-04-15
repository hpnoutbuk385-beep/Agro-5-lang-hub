from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List
from pydantic import BaseModel
from ..database.db import get_db
from ..services import term_service

router = APIRouter(prefix="/terms", tags=["terms"])

class TermRequest(BaseModel):
    word: str
    source_lang: str = "en"

class TermResponse(BaseModel):
    id: int
    word: str
    meaning_uz: str
    meaning_en: str
    meaning_kr: str
    meaning_jp: str
    category: str = None
    source: str = "database"

    class Config:
        from_attributes = True

@router.get("/", response_model=List[TermResponse])
def read_terms(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    from ..models.term import Term
    terms = db.query(Term).offset(skip).limit(limit).all()
    return terms

@router.post("/", response_model=TermResponse)
def get_or_create_term(request: TermRequest, db: Session = Depends(get_db)):
    term, source = term_service.create_or_translate_term(db, request.word, request.source_lang)
    if not term:
        raise HTTPException(status_code=503, detail="Translation service error")
    
    # Add source info for frontend
    resp = TermResponse.from_orm(term)
    resp.source = source
    return resp

@router.get("/{term_id}", response_model=TermResponse)
def read_term(term_id: int, db: Session = Depends(get_db)):
    from ..models.term import Term
    term = db.query(Term).filter(Term.id == term_id).first()
    if not term:
        raise HTTPException(status_code=404, detail="Term not found")
    return term
