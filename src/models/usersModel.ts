import pool from '@/config/database'
import type { UpdateUserProps, UserObject, UserOnlyUsername, UserObjectWithId } from '@/types/user'

const getAllUsers = async (): Promise<UserObjectWithId[]> => {
  const [rows] = await pool.query('SELECT id, username, email, firstName, lastName FROM users')
  return rows as UserObjectWithId[]
}

const getUserByUsername = async ({ username }: UserOnlyUsername) => {
  const [rows] = await pool.query('SELECT id, username, email, firstName, lastName FROM users WHERE username = (?)', [username])
  return rows as UserObjectWithId[]
}

const createUser = async (username: UserObject) => {
  try {
    await pool.query('INSERT INTO users (username, email, firstName, lastName) VALUES (?, ?, ?, ?)',
      [username.username, username.email, username.firstName, username.lastName]
    )
  } catch (error) {
    throw new Error(JSON.stringify(error))
  }
}

const updateUser = async ({ username, newData }: UpdateUserProps) => {
  try {
    await pool.query('UPDATE users SET ? WHERE username = ?', [newData, username])
  } catch (error) {
    throw new Error(JSON.stringify(error))
  }
}

const deleteUser = async ({ username }: UserOnlyUsername) => {
  try {
    await pool.query('DELETE FROM users WHERE (username) = (?)', [username])
  } catch (error) {
    throw new Error(JSON.stringify(error))
  }
}

export default {
  getAllUsers,
  getUserByUsername,
  createUser,
  updateUser,
  deleteUser
}
