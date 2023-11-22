import { Router } from 'express'
import { createOrder } from '../controllers/payment.controller.js'

const router = Router()

router.post('/createOrder', createOrder)

router.get('/success', (req, res) => res.send("tetas"))

router.get('/webhook', (req, res) => res.send("tetas"))

export default router
