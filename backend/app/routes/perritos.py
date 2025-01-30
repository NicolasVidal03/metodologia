from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.config import get_db
from app.models.perrito import Perrito
from typing import Optional
from pydantic import BaseModel

router = APIRouter()

class EstadoUpdate(BaseModel):
    estado: Optional[int] = None

@router.get("/{perrito_id}")
def get_perrito(perrito_id: int, db: Session = Depends(get_db)):
    perrito = db.query(Perrito).filter(Perrito.id == perrito_id).first()
    if not perrito:
        raise HTTPException(status_code=404, detail="Usuario no encontrado")
    return perrito

@router.get("/")
def get_perritos(skip: int = 0, limit: int = 50, db: Session = Depends(get_db)):
    perritos = db.query(Perrito).offset(skip).limit(limit).all()
    
    result = []
    for perro in perritos :
        result.append({
        "id": perro.id,
        "nombre": perro.nombre,
        "raza": perro.raza,
        "color": perro.color,
        "genero": perro.genero,
        "estado": perro.estado_perro,
        "usuario": perro.usuario,
        "foto": perro.foto_perro
    })
    return result

@router.get("/{perrito_id}")
def get_perrito(perrito_id: int, db: Session = Depends(get_db)):
    perrito = db.query(Perrito).filter(Perrito.id == perrito_id).first()
    if not perrito:
        raise HTTPException(status_code=404, detail="Perrito no encontrado")

    return {
        "id": perrito.id,
        "nombre": perrito.nombre,
        "raza": perrito.raza,
        "color": perrito.color,
        "genero": perrito.genero,
        "estado": perrito.estado_perro,
        "usuario": perrito.usuario,
        "foto": perrito.foto_perro,
    }

@router.put("/encontrado/{perrito_id}")
def editar_perrito(perrito_id: int, db: Session = Depends(get_db)):
    perrito = db.query(Perrito).filter(Perrito.id == perrito_id).first()
    print("Información del perrito:", perrito.estado_perro)

    if perrito is None:
        raise HTTPException(status_code=404, detail="Perrito no encontrado")

    if perrito.estado_perro is None:
        raise HTTPException(status_code=404, detail="Estado del perrito no encontrado")

    setattr(perrito.estado_perro, 'estado', 2)
    try:
        db.commit()
        db.refresh(perrito)
    except Exception as e:
        db.rollback()
        raise HTTPException(status_code=500, detail="Error al actualizar el perrito")

    return {"message": "Perrito actualizado exitosamente", "perrito": perrito}