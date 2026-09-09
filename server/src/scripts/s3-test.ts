import {
  S3Client,
  PutObjectCommand,
  GetObjectCommand,
  DeleteObjectCommand,
} from '@aws-sdk/client-s3'
import { config } from '../config'

// Credentials come from AWS_ACCESS_KEY_ID / AWS_SECRET_ACCESS_KEY in the
// environment — the SDK reads them itself, so they are never passed here.
const s3 = new S3Client({ region: config.awsRegion })

const Key = 's3-test/round-trip.txt'
const body = `s3 round trip ${new Date().toISOString()}`

async function verifyRoundTrip(): Promise<void> {
  await s3.send(
    new PutObjectCommand({ Bucket: config.s3Bucket, Key, Body: body }),
  )

  const result = await s3.send(
    new GetObjectCommand({ Bucket: config.s3Bucket, Key }),
  )
  const readBack = await result.Body?.transformToString()

  if (readBack !== body) {
    throw new Error(`Read back ${readBack ?? 'nothing'}, expected ${body}`)
  }

  console.log(`S3 round trip succeeded on ${config.s3Bucket}/${Key}`)
}

verifyRoundTrip()
  .catch((error) => {
    console.error('S3 verification failed:', error.message)
    process.exitCode = 1
  })
  .finally(async () => {
    await s3
      .send(new DeleteObjectCommand({ Bucket: config.s3Bucket, Key }))
      .catch(() => undefined)
  })
