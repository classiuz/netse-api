import { Router } from 'express'
import plansController from '@/controllers/plansController'

const router = Router()

router.get('/', plansController.getAllPlans)
router.post('/', plansController.createPlan)
router.get('/:name', plansController.getPlanById)
router.patch('/:name', plansController.updatePlan)
router.delete('/:name', plansController.deletePlan)

export default router
