import { Router } from 'express'
import blacklistController from '@/controllers/blacklistController'

const router = Router()

router.get('/', blacklistController.getAllBlacklist)
router.post('/', blacklistController.createBlacklist)
router.get('/:clientId', blacklistController.getBlacklistById)
router.patch('/:clientId', blacklistController.updateBlacklist)
router.delete('/:clientId', blacklistController.deleteBlacklist)

export default router
