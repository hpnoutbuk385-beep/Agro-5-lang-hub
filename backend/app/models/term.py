from sqlalchemy import Column, Integer, String, DateTime
from datetime import datetime
from ..database.db import Base

class Term(Base):
    __tablename__ = "terms"

    id = Column(Integer, primary_key=True, index=True)
    word = Column(String, index=True)
    meaning_uz = Column(String, index=True)
    meaning_en = Column(String, index=True)
    meaning_kr = Column(String, index=True)  # Karakalpak
    meaning_jp = Column(String, index=True)
    category = Column(String, index=True, nullable=True)
    created_at = Column(DateTime, default=datetime.utcnow)
