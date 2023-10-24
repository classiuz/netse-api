import pool from '@/config/database'
import type { blacklistObject, blacklistOnlyClientName, UpdateUserProps } from '@/types/blacklist'

const getAllBlacklist = async () => {
  const [rows] = await pool.query('SELECT id, document, clientName, email, reason, addedBy, date, address, coordinates FROM blacklist')
  return rows as blacklistObject[]
}

const getBlacklistByClientName = async ({ clientName }: blacklistOnlyClientName) => {
  const [rows] = await pool.query('SELECT id, document, clientName, email, reason, addedBy, date, address, coordinates FROM blacklist WHERE clientName = (?)', [clientName])
  return rows as blacklistObject[]
}

const createBlacklist = async (blacklist: blacklistObject) => {
  try {
    await pool.query('INSERT INTO blacklist (document, clientName, email, reason, addedBy, date, address, coordinates) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
      [blacklist.document, blacklist.clientName, blacklist.email, blacklist.reason, blacklist.addedBy, blacklist.date, blacklist.address, blacklist.coordinates]
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
