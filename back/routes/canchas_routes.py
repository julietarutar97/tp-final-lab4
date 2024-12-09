from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from database import SessionLocal
from clases.canchas import *

router = APIRouter()


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@router.post("/canchas", response_model=CanchaInDB)
def crear_cancha_endpoint(cancha: CanchaCreate, db: Session = Depends(get_db)):
    return crear_cancha(cancha, db)

@router.get("/canchas", response_model=list[CanchaInDB])
def obtener_canchas(db: Session = Depends(get_db)):
    return db.query(Cancha).all()

