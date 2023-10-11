import express, { type Application } from 'express'

import authMiddleware from './middlewares/authMiddleware'
import userRoutes from './routes/userRoutes'

import { PORT, ROOT_PATH } from './config/server'
import { START_MESSAGE } from './const/server'
import { USER_PATH } from './const/paths'

const app: Application = express()
app.use(express.json())

app.use(ROOT_PATH + USER_PATH, authMiddleware, userRoutes)

app.listen(PORT, () => {
  console.log(START_MESSAGE)
})
