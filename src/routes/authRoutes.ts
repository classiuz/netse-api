import { Router } from 'express'
import authController from '@/controllers/authController'

const router = Router()

router.get('/', authController.authUser)

export default router
