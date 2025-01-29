from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.routes import auth, user, registrar_perrito, perritos, registrar_foto, get_foto, dog_routes
from app.config import engine
from app.models import usuario

usuario.Base.metadata.create_all(bind=engine)

app = FastAPI()

# Configurar CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  # Origen de tu aplicación React
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


app.include_router(auth.router, prefix="/auth", tags=["auth"])
app.include_router(user.router, prefix="/users", tags=["users"])
app.include_router(registrar_perrito.router, prefix="/perro", tags=["perro"])
app.include_router(perritos.router, prefix="/perritos", tags=["perritos"])
app.include_router(registrar_foto.router, prefix="/foto", tags=["foto"])
app.include_router(get_foto.router)
app.include_router(dog_routes.router, prefix="/dogs", tags=["dogs"])


@app.get("/")
async def root():
    return {"message": "Bienvenido a la API de la aplicación para la búsqueda y localización de canes"}
