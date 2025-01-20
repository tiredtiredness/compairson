import express from 'express'

import {
  createList,
  deleteList,
  getList,
  getLists,
  getPublicLists,
  updateList,
} from './list.controllers.js'

const router = express.Router()

router.get('/public', getPublicLists)
router.get('/', getLists)
router.get('/:id', getList)
router.post('/', createList)
router.put('/:id', updateList)
router.delete('/:id', deleteList)

export default router
