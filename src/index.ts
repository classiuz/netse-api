import express, { type Application } from 'express'

import authMiddleware from '@/middlewares/authMiddleware'
import notFoundMiddleware from '@/middlewares/notFoundMiddleware'
import corsMiddleware from '@/middlewares/corsMiddleware'

import userRoutes from '@/routes/usersRoutes'
import authRoutes from '@/routes/authRoutes'
import tokenRoutes from '@/routes/tokenRoutes'
import blacklistRoutes from '@/routes/blacklistRoutes'
import servicesRoutes from '@/routes/servicesRoutes'
import plansRoutes from '@/routes/plansRoutes'
import additionalRoutes from '@/routes/additionalRoutes'

import { PORT, ROOT_PATH } from '@/config/server'
import { START_MESSAGE } from '@/const/messages'
import { AUTH_PATH, USER_PATH, TOKEN_PATH, BLACKLIST_PATH, PLAN_PATH, SERVICE_PATH, ADDITIONAL_PATH } from '@/const/paths'

import createDatabaseTables from '@/utils/createDatabaseTables'

createDatabaseTables()

const app: Application = express()
app.disable('x-powered-by')
app.use(corsMiddleware())
app.use(express.json())

app.use(ROOT_PATH + USER_PATH, authMiddleware, userRoutes)
app.use(ROOT_PATH + AUTH_PATH, authMiddleware, authRoutes)
app.use(ROOT_PATH + TOKEN_PATH, authMiddleware, tokenRoutes)
app.use(ROOT_PATH + BLACKLIST_PATH, authMiddleware, blacklistRoutes)
app.use(ROOT_PATH + SERVICE_PATH, authMiddleware, servicesRoutes)
app.use(ROOT_PATH + PLAN_PATH, authMiddleware, plansRoutes)
app.use(ROOT_PATH + ADDITIONAL_PATH, authMiddleware, additionalRoutes)

app.use(notFoundMiddleware)

app.listen(PORT, () => {
  console.log(START_MESSAGE)
})
