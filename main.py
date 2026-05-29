from fastapi import FastAPI, Depends, HTTPException, status
from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy import create_engine, Column, Integer, String, Boolean
from sqlalchemy.orm import declarative_base, sessionmaker, Session
from pydantic import BaseModel
from typing import List, Optional


SQLALCHEMY_DATABASE_URL = "sqlite:///./clinica.db"
engine = create_engine(SQLALCHEMY_DATABASE_URL, connect_args={"check_same_thread": False})
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
Base = declarative_base()


class FuncionarioDB(Base):
    __tablename__ = "funcionarios"
    id = Column(Integer, primary_key=True, index=True)
    nome = Column(String, index=True)
    cargo = Column(String)
    ativo = Column(Boolean, default=True)

class PacienteDB(Base):
    __tablename__ = "pacientes"
    id = Column(Integer, primary_key=True, index=True)
    nome = Column(String, index=True)
    idade = Column(Integer)
    telefone = Column(String, nullable=True)

Base.metadata.create_all(bind=engine)


class FuncionarioCreate(BaseModel):
    nome: str
    cargo: str
    ativo: bool = True

class FuncionarioResponse(FuncionarioCreate):
    id: int
    class Config:
        from_attributes = True

class PacienteCreate(BaseModel):
    nome: str
    idade: int
    telefone: Optional[str] = None

class PacienteResponse(PacienteCreate):
    id: int
    class Config:
        from_attributes = True


app = FastAPI(title="API Clínica FESF-SUS")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="token")

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


@app.post("/token")
def login_for_access_token(form_data: OAuth2PasswordRequestForm = Depends()):
    if form_data.username != "admin" or form_data.password != "admin":
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Usuário ou senha incorretos",
            headers={"WWW-Authenticate": "Bearer"},
        )
    return {"access_token": form_data.username, "token_type": "bearer"}


@app.post("/funcionarios/", response_model=FuncionarioResponse)
def criar_funcionario(funcionario: FuncionarioCreate, db: Session = Depends(get_db), token: str = Depends(oauth2_scheme)):
    db_funcionario = FuncionarioDB(**funcionario.model_dump())
    db.add(db_funcionario)
    db.commit()
    db.refresh(db_funcionario)
    return db_funcionario

@app.get("/funcionarios/", response_model=List[FuncionarioResponse])
def listar_funcionarios(db: Session = Depends(get_db)):
    return db.query(FuncionarioDB).all()


@app.post("/pacientes/", response_model=PacienteResponse)
def criar_paciente(paciente: PacienteCreate, db: Session = Depends(get_db), token: str = Depends(oauth2_scheme)):
    db_paciente = PacienteDB(**paciente.model_dump())
    db.add(db_paciente)
    db.commit()
    db.refresh(db_paciente)
    return db_paciente

@app.get("/pacientes/", response_model=List[PacienteResponse])
def listar_pacientes(db: Session = Depends(get_db)):
    return db.query(PacienteDB).all()