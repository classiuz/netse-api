import bcrypt from 'bcrypt'
import pool from '@/config/database'
import type { UpdateUserProps, UserObject, UserOnlyUsername, UserObjectWithIdAndCreateAt } from '@/types/user'
import getDate from '@/utils/getDate'

const createTable = async () => {
  await pool.query(`
    CREATE TABLE IF NOT EXISTS users (
      id INT PRIMARY KEY AUTO_INCREMENT,
      username VARCHAR(100) NOT NULL UNIQUE,
      email VARCHAR(255) NOT NULL,
      firstName VARCHAR(255) NOT NULL,
      lastName VARCHAR(255) NOT NULL,
      password VARCHAR(255) NOT NULL,
      createdAt VARCHAR(25) NOT NULL
    )
  `)
}

void createTable()

const getAllUsers = async () => {
  const [rows] = await pool.query('SELECT id, username, email, firstName, lastName, password, createdAt FROM users')
  return rows as UserObjectWithIdAndCreateAt[]
}

const getUserByUsername = async ({ username }: UserOnlyUsername) => {
  const [rows] = await pool.query('SELECT id, username, email, firstName, lastName, password, createdAt FROM users WHERE username = (?)', [username])
  return rows as UserObjectWithIdAndCreateAt[]
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
