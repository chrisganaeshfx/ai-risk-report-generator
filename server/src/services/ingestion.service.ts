import { config } from '../config'

// Stubs a call to the S3 ingestion service. Real implementation will POST
// to `${config.ingestionServiceUrl}/ingest`.
export async function uploadDocument(_body: unknown) {
  return { status: 'ok', ingestionServiceUrl: config.ingestionServiceUrl }
}
