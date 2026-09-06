import express from 'express'
import cors from 'cors'
import { config } from './config'
import { connectDb } from './models/db'
import healthRoutes from './routes/health.routes'
import authRoutes from './routes/auth.routes'
import ingestionRoutes from './routes/ingestion.routes'
import ragRoutes from './routes/rag.routes'
import speechRoutes from './routes/speech.routes'

const app = express()

app.use(cors())
app.use(express.json())

app.use('/api/health', healthRoutes)
app.use('/api/auth', authRoutes)
app.use('/api/ingestion', ingestionRoutes)
app.use('/api/rag', ragRoutes)
app.use('/api/speech', speechRoutes)

async function start() {
  await connectDb()
  app.listen(config.port, () => {
    console.log(`Gateway listening on port ${config.port}`)
  })
}

start().catch((err) => {
  console.error('Failed to start server:', err)
  process.exit(1)
})
