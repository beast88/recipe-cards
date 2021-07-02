import express from 'express'
import { create, update, read, remove, getImages } from '../controllers/recipe.js'
import protect from '../middleware/protect.js'
import { upload } from '../controllers/imageUpload.js'

const router = express.Router()

router.post('/create', protect, upload.single('img'), create)

router.get('/read', protect, read)

router.get('/images/:key', getImages)

router.put('/update', protect, upload.single('img'), update)

router.delete('/delete', protect, remove)

export default router
