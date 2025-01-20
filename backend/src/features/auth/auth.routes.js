import express from 'express'
import { register, login, getUserProfile } from './auth.controllers.js'
import { protect } from '../../middleware/auth.js'

const router = express.Router()

router.post('/register', register)
router.post('/login', login)
router.get('/', protect, getUserProfile)

export default router
