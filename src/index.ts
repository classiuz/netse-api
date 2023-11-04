import express, { type Application } from 'express'

import { PORT, ROOT_PATH } from '@/config/server'
import { START_MESSAGE } from '@/const/messages'
import { PATHS } from '@/const/paths'

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
import servicesAreasRoutes from '@/routes/servicesAreasRoutes'
import salesRoutes from '@/routes/salesRoutes'

import createDatabaseTables from '@/utils/createDatabaseTables'

createDatabaseTables()

const app: Application = express().disable('x-powered-by')
app.use(corsMiddleware())
app.use(express.json())

app.use(ROOT_PATH + PATHS.USERS, authMiddleware, userRoutes)
app.use(ROOT_PATH + PATHS.AUTH, authMiddleware, authRoutes)
app.use(ROOT_PATH + PATHS.TOKEN, authMiddleware, tokenRoutes)
app.use(ROOT_PATH + PATHS.BLACKLIST, authMiddleware, blacklistRoutes)
app.use(ROOT_PATH + PATHS.SERVICES, authMiddleware, servicesRoutes)
app.use(ROOT_PATH + PATHS.PLANS, authMiddleware, plansRoutes)
app.use(ROOT_PATH + PATHS.ADDITIONAL, authMiddleware, additionalRoutes)
app.use(ROOT_PATH + PATHS.SERVICES_AREAS, authMiddleware, servicesAreasRoutes)
app.use(ROOT_PATH + PATHS.SALES, authMiddleware, salesRoutes)

app.use(notFoundMiddleware)

app.listen(PORT, () => {
  console.log(START_MESSAGE)
})
