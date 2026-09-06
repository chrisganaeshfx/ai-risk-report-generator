from fastapi import APIRouter
from pydantic import BaseModel

from app.processors.ocr import extract_text
from app.processors.stt import transcribe

router = APIRouter()


class S3KeyRequest(BaseModel):
    s3_key: str


@router.get("/health")
def health() -> dict:
    return {"status": "ok", "service": "speech-ocr"}


@router.post("/transcribe")
def transcribe_audio(request: S3KeyRequest) -> dict:
    return transcribe(request.s3_key)


@router.post("/ocr")
def ocr_document(request: S3KeyRequest) -> dict:
    return extract_text(request.s3_key)
