const path = require('path')
import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import mongoose from 'mongoose'

dotenv.config()

const app = express()
const port = process.env.PORT || 3001

app.use(cors())
app.use(express.json())

const uri = process.env.ATLAS_URI

mongoose.connect(uri, { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true })

const connection = mongoose.connection
connection.once('open', () => {
  console.log('MongoDB database connection established successfully!')
})

import authRoutes from './routes/auth.js'
import recipeRoutes from './routes/recipe.js'

app.use('/user', authRoutes)
app.use('/recipe', recipeRoutes)

if(process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '/client/build')))

  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'client', 'build', 'index.html'))
  })
}

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`)
})
