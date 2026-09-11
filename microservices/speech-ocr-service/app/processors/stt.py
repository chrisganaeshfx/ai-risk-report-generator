"""Whisper STT processor. Stateless — reads from S3, returns a result. Stub only."""


def transcribe(s3_key: str) -> dict:
    return {"transcript": "placeholder", "confidence": 0.95}
