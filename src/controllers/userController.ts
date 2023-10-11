import type { Request, Response } from 'express'
// import { getAllUsers } from '../models/userModel'

export const getUsers = async (req: Request, res: Response): Promise<void> => {
  try {
    // const users = getAllUsers()
    res.json('Hello World')
  } catch (error) {
    res.status(500).json({ error })
  }
}
