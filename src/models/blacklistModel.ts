import pool from '@/config/database'
import getDate from '@/utils/getDate'
import type { BlacklistObject, BlacklistReturn, BlacklistOnlyClientId, UpdateBlacklistProps } from '@/types/blacklist'

const getAllBlacklist = async () => {
  const [rows] = await pool.query('SELECT id, clientId, reason, createdBy, createdAt FROM blacklist')
  return rows as BlacklistReturn[]
}

const getBlacklistById = async ({ clientId }: BlacklistOnlyClientId) => {
  const [rows] = await pool.query('SELECT id, clientId, reason, createdBy, createdAt FROM blacklist WHERE clientId = (?)', [clientId])
  return rows as BlacklistReturn[]
}

const createBlacklist = async ({ clientId, reason, createdBy }: BlacklistObject) => {
  const date = getDate()

  try {
    await pool.query('INSERT INTO blacklist (clientId, reason, createdBy, createdAt) VALUES (?, ?, ?, ?)',
      [clientId, reason, createdBy, date]
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

const deleteBlacklist = async ({ clientId }: BlacklistOnlyClientId) => {
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
