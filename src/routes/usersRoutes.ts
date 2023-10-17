import { Router } from 'express'
import usersController from '@/controllers/usersController'

const router = Router()

router.get('/', usersController.getAllUsers)
router.post('/', usersController.createUser)
router.get('/:username', usersController.getUserByUsername)
router.patch('/:username', usersController.updateUser)

export default router
