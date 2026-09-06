import { Router } from 'express'
import { transcribe } from '../services/speech.service'

const router = Router()

router.post('/transcribe', async (req, res) => {
  const result = await transcribe(req.body)
  res.json(result)
})

export default router
