import uvicorn

from db import db
from fastapi import FastAPI
from fastapi.staticfiles import StaticFiles
from routers import routers


app = FastAPI()

app.mount("/static", StaticFiles(directory="static"), name="static")


for router in routers:
    app.include_router(router)


@app.on_event("startup")
async def startup():
    await db.connect()


@app.on_event("shutdown")
async def shutdown():
    await db.disconnect()
