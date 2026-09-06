from fastapi import APIRouter
from pydantic import BaseModel

from app.orchestrator.orchestrator import run
from app.retrieval.retriever import retrieve

router = APIRouter()


class GenerateRequest(BaseModel):
    query: str


class RetrieveRequest(BaseModel):
    query: str


@router.get("/health")
def health() -> dict:
    return {"status": "ok", "service": "rag"}


@router.post("/generate")
def generate_report(request: GenerateRequest) -> dict:
    return run(request.query)


@router.post("/retrieve")
def retrieve_chunks(request: RetrieveRequest) -> dict:
    # Calls the retriever directly — used by the evaluation harness.
    return {"results": retrieve(request.query)}
