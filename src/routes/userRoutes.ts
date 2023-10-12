import { Router } from 'express'
import { getUser, getUsers } from '@/controllers/userController'

const router = Router()

router.get('/', getUsers)
router.get('/:userName', getUser)

export default router
