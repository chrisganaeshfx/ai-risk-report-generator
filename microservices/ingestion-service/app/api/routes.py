from fastapi import APIRouter
from pydantic import BaseModel

router = APIRouter()


class IngestRequest(BaseModel):
    filename: str


@router.get("/health")
def health() -> dict:
    return {"status": "ok", "service": "ingestion"}


@router.post("/ingest")
def ingest(request: IngestRequest) -> dict:
    # Stub only — no real pipeline call yet.
    return {"status": "queued", "file": request.filename}
