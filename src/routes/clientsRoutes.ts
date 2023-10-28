import { Router } from 'express'
import clientsController from '@/controllers/clientsController'

const router = Router()

router.get('/', clientsController.getAllClients)
router.post('/', clientsController.createClient)
router.get('/:id', clientsController.getClientById)
router.patch('/:id', clientsController.updateClient)
router.delete('/:id', clientsController.deleteClient)

export default router
