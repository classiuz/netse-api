import { Router } from 'express'
import servicesController from '@/controllers/servicesController'

const router = Router()

router.get('/', servicesController.getAllServices)
router.post('/', servicesController.createService)
router.get('/:name', servicesController.getServiceByName)
router.patch('/:name', servicesController.updateService)
router.delete('/:name', servicesController.deleteService)

export default router
