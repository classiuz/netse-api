import { Router } from 'express'
import groupsController from '@/controllers/groupsController'

const router = Router()

router.get('/', groupsController.getAllGroups)
router.post('/', groupsController.createGroup)
router.get('/:name', groupsController.getAllGroups)
router.patch('/:name', groupsController.updateGroup)
router.delete('/:name', groupsController.deleteGroup)

export default router
