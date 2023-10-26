import pool from '@/config/database'
import getDate from '@/utils/getDate'
import type { blacklistObject, blacklistOnlyClientId, UpdateBlacklistProps } from '@/types/blacklist'

const createTable = async () => {
  await pool.query(`
    CREATE TABLE IF NOT EXISTS blacklist (
      id INT PRIMARY KEY AUTO_INCREMENT,
      clientId VARCHAR(10) NOT NULL,
      reason TEXT NOT NULL,
      addedBy VARCHAR(100) NOT NULL,
      FOREIGN KEY (addedBy) REFERENCES users(username),
      createdAt VARCHAR(25) NOT NULL
    )
  `)
}

void createTable()

const getAllBlacklist = async () => {
  const [rows] = await pool.query('SELECT id, clientId, reason, addedBy, createdAt FROM blacklist')
  return rows as blacklistObject[]
}

const getBlacklistById = async ({ clientId }: blacklistOnlyClientId) => {
  const [rows] = await pool.query('SELECT id, clientId, reason, addedBy, createdAt FROM blacklist WHERE clientId = (?)', [clientId])
  return rows as blacklistObject[]
}

const createBlacklist = async ({ clientId, reason, addedBy }: blacklistObject) => {
  const date = getDate()

  try {
    await pool.query('INSERT INTO blacklist (clientId, reason, addedBy, createdAt) VALUES (?, ?, ?, ?)',
      [clientId, reason, addedBy, date]
    )
  } catch (error) {
    throw error
  }
}

const updateBlacklist = async ({ clientId, newData }: UpdateBlacklistProps) => {
  try {
    await pool.query('UPDATE blacklist SET ? WHERE clientId = ?', [newData, clientId])
  } catch (error) {
    throw error
  }
}

const deleteBlacklist = async ({ clientId }: blacklistOnlyClientId) => {
  try {
    await pool.query('DELETE FROM blacklist WHERE (clientId) = (?)', [clientId])
  } catch (error) {
    throw error
  }
}

export default {
  getAllBlacklist,
  getBlacklistById,
  createBlacklist,
  updateBlacklist,
  deleteBlacklist
}
