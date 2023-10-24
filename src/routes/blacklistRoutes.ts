import { Router } from 'express'
import blacklistController from '@/controllers/blacklistController'

const router = Router()

router.get('/', blacklistController.getAllBlacklist)
router.post('/', blacklistController.createBlacklist)
router.get('/:clientName', blacklistController.getBlacklistByClientName)
router.patch('/:clientName', blacklistController.updateBlacklist)
router.delete('/:clientName', blacklistController.deleteBlacklist)

export default router
