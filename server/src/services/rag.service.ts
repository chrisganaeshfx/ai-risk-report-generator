import { config } from '../config'

// Stubs a call to the S4 RAG service. Real implementation will POST to
// `${config.ragServiceUrl}/generate`.
export async function generateReport(_body: unknown) {
  return { status: 'ok', ragServiceUrl: config.ragServiceUrl }
}
