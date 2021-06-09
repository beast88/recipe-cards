import express from 'express'
import { create, update, read, remove } from '../controllers/recipe.js'
import protect from '../middleware/protect.js'
import upload from '../controllers/imageUpload'
import rewriter from '../middleware/rewriter'

const router = express.Router()

router.post('/create', protect, upload.single('image'), rewriter, create)

router.get('/read', protect, read)

router.put('/update', protect, update)

router.delete('/delete', protect, remove)

export default router
