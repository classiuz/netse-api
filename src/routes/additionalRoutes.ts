import { Router } from 'express'
import additionalController from '@/controllers/additionalController'

const router = Router()

router.get('/', additionalController.getAllAdditional)
router.post('/', additionalController.createAdditional)
router.get('/:name', additionalController.getAdditionalByName)
router.patch('/:name', additionalController.updateAdditional)
router.delete('/:name', additionalController.deleteAdditional)

export default router
