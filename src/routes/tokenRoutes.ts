import { Router } from 'express'
import tokenController from '@/controllers/tokenController'

const router = Router()

router.get('/', tokenController.getAllTokens)
router.post('/', tokenController.createToken)
router.delete('/:tokenName', tokenController.deleteToken)

export default router
