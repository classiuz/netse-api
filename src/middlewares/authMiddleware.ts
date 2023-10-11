import type { NextFunction, Request, Response } from 'express'

const checkAuth = (req: Request, res: Response, next: NextFunction) => {
  console.log('Llego AUTH')
  //   const token = req.headers.authorization
  //   if (!token) {
  //     return res.status(401).json({ message: 'Unauthorized' })
  //   }
  // TODO Validate token and set req.user if valid
  next()
}

export default checkAuth
