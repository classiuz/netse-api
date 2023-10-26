import { Router } from 'express'
import clientsController from '@/controllers/clientsController'

const router = Router()

router.get('/', clientsController.getAllClients)
router.post('/', clientsController.createClient)
router.get('/:clientId', clientsController.getClientById)
router.patch('/:clientId', clientsController.updateClient)
router.delete('/:clientId', clientsController.deleteClient)

export default router
