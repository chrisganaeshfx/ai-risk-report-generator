from fastapi import FastAPI

from app.api.routes import router

app = FastAPI(title="A2603 RAG Service")
app.include_router(router)
