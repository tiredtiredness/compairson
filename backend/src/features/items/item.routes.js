import express from 'express'
import {
  createItem,
  deleteItem,
  getItems,
  updateItem,
} from './item.controllers.js'

const router = express.Router()

router.get('/:id', getItems)
router.post('/', createItem)
router.put('/:id', updateItem)
router.delete('/:id', deleteItem)

export default router
