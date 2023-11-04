import { Router } from 'express'
import salesController from '@/controllers/salesController'

const router = Router()

router.get('/', salesController.getAllSales)
router.post('/', salesController.createSale)
router.get('/:id', salesController.getSaleById)
router.patch('/:id', salesController.updateSale)
router.delete('/:id', salesController.deleteSales)

export default router
