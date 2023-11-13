import { Router } from 'express'
import apiKeysController from '@/controllers/apiKeysController'

const router = Router()

router.get('/', apiKeysController.getAllApiKeys)
router.post('/', apiKeysController.createApiKey)
router.delete('/:name', apiKeysController.deleteApiKey)

export default router
