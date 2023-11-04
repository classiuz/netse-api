import { Router } from 'express'
import servicesAreasController from '@/controllers/servicesAreasController'

const router = Router()

router.get('/', servicesAreasController.getAllServicesAreas)
router.post('/', servicesAreasController.createServiceArea)
router.get('/:name', servicesAreasController.getServiceAreaByName)
router.patch('/:name', servicesAreasController.updateServiceArea)
router.delete('/:name', servicesAreasController.deleteServiceArea)

export default router
