import { Router } from 'express'
import { generateReport } from '../services/rag.service'

const router = Router()

router.post('/generate', async (req, res) => {
  const result = await generateReport(req.body)
  res.json(result)
})

export default router
