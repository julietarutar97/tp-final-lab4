from sqlalchemy import Column, Integer, String, Boolean, ForeignKey, DateTime, Time
from sqlalchemy.orm import relationship
from database import Base
from pydantic import BaseModel
from sqlalchemy.orm import Session
from fastapi import HTTPException


#modelo base de datos
class Cancha(Base):
    __tablename__ = "canchas"
    id = Column(Integer, primary_key=True, index=True)
    nombre = Column(String, index=True, unique=True)
    techada = Column(Boolean, default=False)
    reservas = relationship("Reserva", back_populates="cancha")


#esquema de la tabla
class CanchaCreate(BaseModel):
    nombre: str
    techada: bool

class CanchaInDB(CanchaCreate):
    id: int
    class Config:
        from_attributes = True

#funciones de la clase

#Crear una nueva cancha
def crear_cancha(cancha: CanchaCreate, db: Session):
    nueva_cancha = Cancha(
        nombre=cancha.nombre,
        techada=cancha.techada
    )
    db.add(nueva_cancha)
    db.commit()
    db.refresh(nueva_cancha)

    return nueva_cancha