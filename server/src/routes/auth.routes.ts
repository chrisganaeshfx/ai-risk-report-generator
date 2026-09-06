import { Router } from 'express'
import { login } from '../services/auth.service'

const router = Router()

// Stub only — no real auth yet.
router.post('/login', (req, res) => {
  res.json(login(req.body))
})

export default router
