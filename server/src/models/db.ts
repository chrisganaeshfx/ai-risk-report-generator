import mongoose from 'mongoose'
import { config } from '../config'

// Mongoose connection, driven by MONGODB_URL (never hardcode credentials).
export async function connectDb(): Promise<void> {
  await mongoose.connect(config.mongodbUri)
}
