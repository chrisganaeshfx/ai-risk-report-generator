import mongoose from 'mongoose'
import { config } from '../config'

// Mongoose connection, driven by MONGODB_URI (never hardcode credentials).
export async function connectDb(): Promise<void> {
  await mongoose.connect(config.mongodbUri, {
    maxPoolSize: 10,
    serverSelectionTimeoutMS: 10_000,
  })

  const database = mongoose.connection.db

  if (!database) {
    throw new Error('MongoDB connection was created without a database')
  }

  await database.admin().command({ ping: 1 })

  console.log(`MongoDB connected: ${mongoose.connection.name}`)
}