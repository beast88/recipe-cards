import express from 'express'
import { create, update, read, remove } from '../controllers/recipe.js'
import protect from '../middleware/protect.js'

const router = express.Router()

router.post('/create', protect, create)

router.get('/read', protect, read)

router.put('/update', protect, update)

router.delete('/delete', protect, remove)

export default router
