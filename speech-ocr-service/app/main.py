from fastapi import FastAPI

from app.api.routes import router

app = FastAPI(title="A2603 Speech/OCR Service")
app.include_router(router)
