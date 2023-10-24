import pool from '@/config/database'
import type { blacklistObject, blacklistOnlyClientName, UpdateUserProps } from '@/types/blacklist'
import getDate from '@/utils/getDate'

const createTable = async () => {
  await pool.query(`
    CREATE TABLE IF NOT EXISTS blacklist (
      id INT PRIMARY KEY AUTO_INCREMENT,
      document VARCHAR(100) NOT NULL UNIQUE,
      clientName VARCHAR(300) NOT NULL,
      email VARCHAR(255) NOT NULL,
      reason TEXT NOT NULL,
      addedBy VARCHAR(100) NOT NULL,
      FOREIGN KEY (addedBy) REFERENCES users(username),
      createdAt VARCHAR(25) NOT NULL,
      address JSON NOT NULL,
      coordinates JSON NOT NULL
    )
  `)
}

void createTable()

const getAllBlacklist = async () => {
  const [rows] = await pool.query('SELECT id, document, clientName, email, reason, addedBy, createdAt, address, coordinates FROM blacklist')
  return rows as blacklistObject[]
}

const getBlacklistByClientName = async ({ clientName }: blacklistOnlyClientName) => {
  const [rows] = await pool.query('SELECT id, document, clientName, email, reason, addedBy, createdAt, address, coordinates FROM blacklist WHERE clientName = (?)', [clientName])
  return rows as blacklistObject[]
}

const createBlacklist = async (blacklist: blacklistObject) => {
  const date = getDate()

  try {
    await pool.query('INSERT INTO blacklist (document, clientName, email, reason, addedBy, createdAt, address, coordinates) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
      [blacklist.document, blacklist.clientName, blacklist.email, blacklist.reason, blacklist.addedBy, date, JSON.stringify(blacklist.address), JSON.stringify(blacklist.coordinates)]
    )
  } catch (error) {
    throw error
  }
}

const updateBlacklist = async ({ clientName, newData }: UpdateUserProps) => {
  try {
    await pool.query('UPDATE blacklist SET (?) WHERE clientName = (?)', [newData, clientName])
  } catch (error) {
    throw error
  }
}

const deleteBlacklist = async ({ clientName }: blacklistOnlyClientName) => {
  try {
    await pool.query('DELETE FROM blacklist WHERE (clientName) = (?)', [clientName])
  } catch (error) {
    throw error
  }
}

export default {
  getAllBlacklist,
  getBlacklistByClientName,
  createBlacklist,
  updateBlacklist,
  deleteBlacklist
}
