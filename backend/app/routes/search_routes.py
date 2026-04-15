from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from typing import List
from ..database.db import get_db
from ..services import term_service
from .term_routes import TermResponse

router = APIRouter(prefix="/search", tags=["search"])

@router.get("/", response_model=List[TermResponse])
def search(q: str, db: Session = Depends(get_db)):
    results = term_service.search_terms(db, q)
    return results
