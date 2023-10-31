import bcrypt from 'bcrypt'
import pool from '@/config/database'
import getDate from '@/utils/getDate'
import type { UpdateUserProps, GetUserProps, UserObject, UserOnlyUsername, UserReturn, UsersModelsGenericProps } from '@/types/user'

const getAllUsers = async ({ querys }: UsersModelsGenericProps) => {
  const [rows] = await pool.query('SELECT id, username, email, firstName, lastName, createdAt FROM users')
  return rows as UserReturn[]
}

const getUserByUsername = async ({ username, selectFields = [] }: GetUserProps) => {
  const fields = ['id', 'username', 'email', 'firstName', 'lastName', 'createdAt', ...selectFields]
  const [rows] = await pool.query(`SELECT ${fields.join(', ')} FROM users WHERE username = (?)`, [username])
  return rows as UserReturn[]
}

const createUser = async (username: UserObject) => {
  const hashedPassword = await bcrypt.hash(username.password, 10)
  const date = getDate()

  try {
    await pool.query('INSERT INTO users (username, email, firstName, lastName, password, createdAt) VALUES (?, ?, ?, ?, ?, ?)',
      [username.username, username.email, username.firstName, username.lastName, hashedPassword, date]
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
