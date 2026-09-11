"""Single controller for the RAG pipeline.

Calls retrieval -> context assembly -> generation -> guardrail-check as
plain, sequential function calls. No event bus, no background tasks —
this is the one place that defines pipeline order, so a single run can
always be traced end to end (needed by the eval harness).
"""

from app.generation.generator import generate
from app.guardrails.checker import check
from app.retrieval.retriever import retrieve


def _assemble_context(chunks: list[dict]) -> str:
    return "\n".join(str(chunk) for chunk in chunks)


def run(query: str) -> dict:
    chunks = retrieve(query)
    context = _assemble_context(chunks)
    generated_text = generate(context)
    guardrail_result = check(generated_text)
    return {
        "text": generated_text,
        "guardrail": guardrail_result,
    }
