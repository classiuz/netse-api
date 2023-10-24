import bcrypt from 'bcrypt'
import pool from '@/config/database'
import type { UpdateUserProps, UserObject, UserOnlyUsername, UserObjectWithId } from '@/types/user'

const getAllUsers = async () => {
  const [rows] = await pool.query('SELECT id, username, email, firstName, lastName, password FROM users')
  return rows as UserObjectWithId[]
}

const getUserByUsername = async ({ username }: UserOnlyUsername) => {
  const [rows] = await pool.query('SELECT id, username, email, firstName, lastName, password FROM users WHERE username = (?)', [username])
  return rows as UserObjectWithId[]
}

const createUser = async (username: UserObject) => {
  const hashedPassword = await bcrypt.hash(username.password, 10)

  try {
    await pool.query('INSERT INTO users (username, email, firstName, lastName, password) VALUES (?, ?, ?, ?, ?)',
      [username.username, username.email, username.firstName, username.lastName, hashedPassword]
    )
  } catch (error) {
    throw error
  }
}

const updateUser = async ({ username, newData }: UpdateUserProps) => {
  try {
    await pool.query('UPDATE users SET ? WHERE username = ?', [newData, username])
  } catch (error) {
    throw error
  }
}

const deleteUser = async ({ username }: UserOnlyUsername) => {
  try {
    await pool.query('DELETE FROM users WHERE (username) = (?)', [username])
  } catch (error) {
    throw error
  }
}

export default {
  getAllUsers,
  getUserByUsername,
  createUser,
  updateUser,
  deleteUser
}
