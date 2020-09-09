import settings
from fastapi import Depends
from fastapi.security import OAuth2PasswordBearer
from app import app

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="token")


@app.get("/")
async def root():
    return {"message": settings.DB_URL}

@app.get("/users/")
async def read_items(token: str = Depends(oauth2_scheme)):
    return {"token": token}
