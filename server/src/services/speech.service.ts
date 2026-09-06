import { config } from '../config'

// Stubs a call to the S5 speech/OCR service. Real implementation will POST
// to `${config.speechOcrServiceUrl}/transcribe`.
export async function transcribe(_body: unknown) {
  return { status: 'ok', speechOcrServiceUrl: config.speechOcrServiceUrl }
}
