# A2603 — AI Risk Report Generator

Capstone project (A2603) for Marsh Singapore: an AI-powered system that generates
insurance risk reports. Users upload documents (and audio/scanned files), the system
extracts and indexes their content, and generates grounded, citation-checked risk
reports via retrieval-augmented generation.

## Architecture

The system is five independently deployable services across four tiers, communicating
over HTTP, sharing a MongoDB Atlas cluster and an AWS S3 bucket in the data tier:

| Service | Role | Language | Port |
|---|---|---|---|
| `client` (S1) | React client | TypeScript (Vite) | 3000 |
| `server` (S2) | API gateway | Node/Express (TypeScript) | 4000 |
| `ingestion-service` (S3) | Parse, PII-guard, chunk, embed documents | Python/FastAPI | 8001 |
| `rag-service` (S4) | Retrieve, assemble context, generate, guardrail-check | Python/FastAPI | 8002 |
| `speech-ocr-service` (S5) | Stateless STT and OCR, returns results only | Python/FastAPI | 8003 |
| `mongo` | Local dev database (Atlas is used for staging/prod) | — | 27017 |

This repository currently contains the scaffolded folder structure for each service
(routes/services/models separation in `server`, `api`/pipeline/orchestrator layout in
the Python services); application code lands service-by-service as the project
progresses. See `docs/DECISIONS.md` for why this is microservices rather than a
monolith, and why S4 uses a single orchestrator function rather than choreography.

## Running the stack locally

```
cp .env.example .env   # fill in the real values
docker-compose up
```

Each of the five health endpoints should then be reachable at
`http://localhost:<port>/health` (or `/api/health` for the gateway).

## Branch and commit convention

- Branches: `feature/<initials>-<story-id>` (e.g. `feature/cg-F-01`)
- Commits must reference the story ID: `feat(F-01): init repo`

This README must reflect the current architecture. If a PR changes what is true here, update this file in the same PR — not later.
