import express from 'express'
import {
  createUser,
  deleteUser,
  getUser,
  getUsers,
  updateUser,
} from './user.controllers.js'

const router = express.Router()

router.get('/', getUser)
router.post('/', createUser)
router.put('/', updateUser)
router.delete('/', deleteUser)

export default router
