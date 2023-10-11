import { Router } from 'express'
// import { getUsers } from '../controllers/userController'
import { USER_PATH } from '../const/paths'

const router = Router()

router.get(USER_PATH, (req, res) => {
  res.send('LLEGO')
})

export default router
