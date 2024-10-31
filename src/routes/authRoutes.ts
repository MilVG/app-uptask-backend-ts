import { Router } from "express";

const router = Router()


router.get('/', (req, res) => {
  res.send('des /api/auth')
})

export default router
