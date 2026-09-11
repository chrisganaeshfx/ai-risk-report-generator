"""Contract tests for S5's HTTP surface.

STT and OCR are still stubs, so these assert the response *shape* the
gateway depends on — not the placeholder values, which change once real
logic lands.
"""

from fastapi.testclient import TestClient

from app.main import app

client = TestClient(app)


def test_health():
    response = client.get("/health")
    assert response.status_code == 200
    assert response.json() == {"status": "ok", "service": "speech-ocr"}


def test_transcribe_returns_transcript():
    response = client.post("/transcribe", json={"s3_key": "audio/call.mp3"})
    assert response.status_code == 200
    assert isinstance(response.json()["transcript"], str)


def test_ocr_returns_text():
    response = client.post("/ocr", json={"s3_key": "scans/policy.png"})
    assert response.status_code == 200
    assert isinstance(response.json()["text"], str)


def test_transcribe_requires_s3_key():
    assert client.post("/transcribe", json={}).status_code == 422
