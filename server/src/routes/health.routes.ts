import { Router } from 'express'
import { getHealth } from '../services/health.service'

const router = Router()

router.get('/', (_req, res) => {
  res.json(getHealth())
})

export default router
