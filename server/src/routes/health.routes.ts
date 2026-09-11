import { Router } from 'express'
import {
  getDatabaseHealth,
  getHealth,
} from '../services/health.service'

const router = Router()

router.get('/', (_req, res) => {
  res.json(getHealth())
})

router.get('/database', async (_req, res) => {
  try {
    res.json(await getDatabaseHealth())
  } catch (error: unknown) {
    console.error('Database health check failed:', error)
    res.status(503).json({
      status: 'degraded',
      database: 'down',
      testRecordFound: false,
    })
  }
})

export default router
