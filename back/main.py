from fastapi import FastAPI
from routes import canchas_routes, reservas_routes
from fastapi.middleware.cors import CORSMiddleware


app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def read_root():
    return {"message": "Sistema de reserva de canchas de paddle"}


app.include_router(canchas_routes.router, prefix="/api", tags=["canchas"])

app.include_router(reservas_routes.router, prefix="/api", tags=["reservas"])