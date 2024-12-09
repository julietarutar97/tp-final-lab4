from sqlalchemy import Column, Integer, String, Boolean, ForeignKey, DateTime, Date, Time, and_, extract, or_
from datetime import date, time, timedelta
from sqlalchemy.orm import relationship
from database import Base
from pydantic import BaseModel
from sqlalchemy.orm import Session
from fastapi import HTTPException, status

#Modelo base de datos
class Reserva(Base):
    __tablename__ = "reservas"
    id = Column(Integer, primary_key=True, index=True)
    cancha_id = Column(Integer, ForeignKey("canchas.id"))
    dia = Column(Date)
    hora = Column(Time)
    duracion = Column(Integer)
    nombre_contacto = Column(String)
    telefono_contacto = Column(String)

    cancha = relationship("Cancha", back_populates="reservas")

# Esquema de la tabla
class ReservaCreate(BaseModel):
    cancha_id: int
    dia: date
    hora: time
    duracion: int
    telefono_contacto: str
    nombre_contacto: str

class ReservaInDB(ReservaCreate):
    id: int
    class Config:
        from_attributes = True

class ReservaResponse(BaseModel):
    id: int
    cancha_id: int
    dia: date
    hora: time
    duracion: int
    telefono_contacto: str
    nombre_contacto: str

    class Config:
        orm_mode = True

#verfiar si la cancha tiene disponibilidad
def verificar_reserva(cancha_id: int, dia: date, hora: time, duracion: int, db: Session):
    resultado = False
    reservas = db.query(Reserva).filter(Reserva.cancha_id == cancha_id, Reserva.dia == dia).all()

    for reserva in reservas:
        if(reservas.Length == 0):
            resultado = True
        if reserva.hora == hora:
            print("PRRRRRRRRRRRIIIIIIIINTTTTTTT")
            raise HTTPException(status_code=400, detail="La cancha no está disponible a esa hora")
        elif reserva.hora != hora:
            hora_inicio = reserva.hora.hour *60 + reserva.hora.minute
            hora_fin = hora_inicio + reserva.duracion * 60
            hora_nueva = hora.hour * 60 + hora.minute
            print("hora_inicio", hora_inicio)
            print("hora_fin", hora_fin)
            print("hora_nueva", hora_nueva)
            if hora_nueva >= hora_fin:
                resultado = True
        else:
            raise HTTPException(status_code=400, detail="La cancha no se puede reservar en ese momento")
    return resultado

#NUEVO VERIFICAR RESERVA:
def verificador_reserva(db: Session, reserva: ReservaCreate):
    inicio_minutos = reserva.hora.hour * 60 + reserva.hora.minute
    fin_minutos = inicio_minutos + reserva.duracion * 60
    

    existing_reserva = db.query(Reserva).filter(
        Reserva.cancha_id == reserva.cancha_id,
        Reserva.dia == reserva.dia,
        or_(
            and_(
                (extract('hour', Reserva.hora) * 60 + extract('minute', Reserva.hora)) < fin_minutos,
                (extract('hour', Reserva.hora) * 60 + extract('minute', Reserva.hora) + Reserva.duracion * 60) > inicio_minutos
            )
        )
    ).first()

    return existing_reserva


# Funciones de la clase
def crear_reservas(reserva: ReservaCreate, db: Session):
    if verificador_reserva(db, reserva):
        ValueError("La reserva ya existe", details="La reserva ya existe")
     
    nueva_reserva = Reserva(
        cancha_id=reserva.cancha_id,
        dia=reserva.dia,
        hora=reserva.hora,
        duracion=reserva.duracion,
        telefono_contacto=reserva.telefono_contacto,
        nombre_contacto=reserva.nombre_contacto
    )
    db.add(nueva_reserva)
    db.commit()
    db.refresh(nueva_reserva)

    return nueva_reserva
    #else:
       # raise HTTPException(status_code=400, detail='..')

def eliminar_reserva(reserva_id: int, db: Session):
    reserva = db.query(Reserva).filter(Reserva.id == reserva_id).first()
    db.delete(reserva)
    db.commit()

def obtener_reservas(db: Session):
    return db.query(Reserva).all()

def obtener_reserva_por_id(reserva_id: int, db: Session):
    return db.query(Reserva).filter(Reserva.id == reserva_id).first()

def obtener_reserva_por_cancha_dia(cancha_id: int, dia: date, db: Session):
    return db.query(Reserva).filter(Reserva.cancha_id == cancha_id, Reserva.dia == dia).all()


def actualizar_reserva(reserva_id: int, nueva_reserva: ReservaCreate, db: Session):
    try:
        reserva = db.query(Reserva).filter(Reserva.id == reserva_id).first()

        if not reserva:
            raise HTTPException(status_code=404, detail="Reserva no encontrada")

        reserva.cancha_id = nueva_reserva.cancha_id
        reserva.dia = nueva_reserva.dia
        reserva.hora = nueva_reserva.hora
        reserva.duracion = nueva_reserva.duracion
        reserva.telefono_contacto = nueva_reserva.telefono_contacto
        reserva.nombre_contacto = nueva_reserva.nombre_contacto
        
        if verificador_reserva(db, reserva):
            ValueError("La reserva ya existe", details="La reserva ya existe")
        db.commit()
        db.refresh(reserva)
    except ValueError as e:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail = str(e))  
    return reserva