from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from database import SessionLocal
from clases.reservas import *

router = APIRouter()


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@router.post("/reservas", response_model=ReservaResponse) #Response_model es el que se devuelve al cliente
def crear_reserva_endpoint(reserva: ReservaCreate, db: Session = Depends(get_db)): #reservaCreate es lo que me va a pedir
     return crear_reservas(reserva, db)

@router.get("/reservas", response_model=list[ReservaResponse])
def obtener_reservas_endpoint(db: Session = Depends(get_db)):
    return obtener_reservas(db)

@router.get("/reservas/{reserva_id}", response_model=ReservaResponse)
def obtener_reserva_por_id_endpoint(reserva_id: int, db: Session = Depends(get_db)):
    return obtener_reserva_por_id(reserva_id, db)

@router.put("/reservas/{reserva_id}", response_model=ReservaResponse)
def actualizar_reserva_endpoint(reserva_id: int, reserva: ReservaCreate, db: Session = Depends(get_db)):
    return actualizar_reserva(reserva_id, reserva, db)

@router.delete("/reservas/{reserva_id}")
def eliminar_reserva_endpoint(reserva_id: int, db: Session = Depends(get_db)):
    return eliminar_reserva(reserva_id, db)