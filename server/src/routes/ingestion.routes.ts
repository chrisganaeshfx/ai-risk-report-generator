import { Router } from 'express'
import { uploadDocument } from '../services/ingestion.service'

const router = Router()

router.post('/upload', async (req, res) => {
  const result = await uploadDocument(req.body)
  res.json(result)
})

export default router
