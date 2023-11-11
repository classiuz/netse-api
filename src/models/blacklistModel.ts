import { database } from '@/lib/config'
import type { BlacklistObject, BlacklistReturn, BlacklistOnlyClientId, UpdateBlacklistProps } from '@/types/blacklist'

const getAllBlacklist = async () => {
  const [rows] = await database.query('SELECT id, clientId, reason, createdBy, createdAt FROM blacklist')
  return rows as BlacklistReturn[]
}

const getBlacklistById = async ({ clientId }: BlacklistOnlyClientId) => {
  const [rows] = await database.query('SELECT id, clientId, reason, createdBy, createdAt FROM blacklist WHERE clientId = (?)', [clientId])
  return rows as BlacklistReturn[]
}

const createBlacklist = async ({ clientId, reason, createdBy }: BlacklistObject) => {
  try {
    await database.query('INSERT INTO blacklist (clientId, reason, createdBy) VALUES (?, ?, ?)',
      [clientId, reason, createdBy]
    )
  } catch (error) {
    throw error
  }
}

const updateBlacklist = async ({ clientId, newData }: UpdateBlacklistProps) => {
  try {
    await database.query('UPDATE blacklist SET ? WHERE clientId = ?', [newData, clientId])
  } catch (error) {
    throw error
  }
}

const deleteBlacklist = async ({ clientId }: BlacklistOnlyClientId) => {
  try {
    await database.query('DELETE FROM blacklist WHERE (clientId) = (?)', [clientId])
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
