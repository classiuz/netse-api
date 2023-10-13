import express, { type Application } from 'express'
import dotenv from 'dotenv'

import authMiddleware from '@/middlewares/authMiddleware'
import notFoundMiddleware from '@/middlewares/notFoundMiddleware'
import userRoutes from '@/routes/userRoutes'

import { PORT, ROOT_PATH } from '@/config/server'
import { START_MESSAGE } from '@/const/messages'
import { USER_PATH } from '@/const/paths'

dotenv.config()

const app: Application = express()
app.use(express.json())

app.use(ROOT_PATH + USER_PATH, authMiddleware, userRoutes)

app.use(notFoundMiddleware)

app.listen(PORT, () => {
  console.log(START_MESSAGE)
})
