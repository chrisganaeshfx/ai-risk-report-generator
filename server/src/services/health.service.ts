import mongoose from 'mongoose'
import { SiteModel } from '../models/site.model'

export function getHealth() {
  return { status: 'ok' }
}

export async function getDatabaseHealth() {
  const database = mongoose.connection.db

  if (!database) {
    throw new Error('Database connection is not ready')
  }

  await database.admin().command({ ping: 1 })

  const testRecord = await SiteModel.exists({
    code: 'SYN-SG-001',
  })

  return {
    status: 'ok',
    database: 'up',
    testRecordFound: Boolean(testRecord),
  }
}
