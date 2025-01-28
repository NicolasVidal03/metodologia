from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.config import get_db
from app.models.perrito import Perrito
router = APIRouter()
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
        "usuario": perro.usuario
    })
    return result