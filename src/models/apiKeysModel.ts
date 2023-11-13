import bcrypt from 'bcrypt'
import crypto from 'crypto'
import { database } from '@/lib/config'
import type { ApiKeyObject, ApiKeyObjectWithIdAndCreateAt, ApiKeyOnlyName, ApiKeysObjectWithIdAndCreateAtAndValue } from '@/types/apiKeys'

const getAllApiKeys = async () => {
  const [rows] = await database.query('SELECT id, name, createdBy, createdAt FROM `api-keys`')
  return rows as ApiKeyObjectWithIdAndCreateAt[]
}

const getAllApiKeysValues = async () => {
  const [rows] = await database.query('SELECT id, name, value, createdBy, createdAt FROM `api-keys`')
  return rows as ApiKeysObjectWithIdAndCreateAtAndValue[]
}

const getApiKeyByName = async ({ name }: ApiKeyOnlyName) => {
  const [rows] = await database.query('SELECT id, name, createdBy, createdAt FROM `api-keys` WHERE name = (?)', [name])
  return rows as ApiKeyObjectWithIdAndCreateAt[]
}

const createApiKey = async ({ name, createdBy }: ApiKeyObject) => {
  const value = crypto.randomUUID()
  const hashedValue = await bcrypt.hash(value, 10)
  try {
    await database.query('INSERT INTO `api-keys` (name, value, createdBy) VALUES (?, ?, ?)',
      [name, hashedValue, createdBy]
    )
    return { name, value, createdBy }
  } catch (error) {
    throw error
  }
}

const deleteApiKey = async ({ name }: ApiKeyOnlyName) => {
  try {
    await database.query('DELETE FROM `api-keys` WHERE (name) = (?)', [name])
  } catch (error) {
    throw error
  }
}

export default {
  getAllApiKeys,
  getAllApiKeysValues,
  getApiKeyByName,
  createApiKey,
  deleteApiKey
}
