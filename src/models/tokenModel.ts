import bcrypt from 'bcrypt'
import crypto from 'crypto'
import { database } from '@/lib/config'
import type { TokenObject, TokenObjectWithIdAndCreateAt, TokenOnlyName, TokenObjectWithIdAndCreateAtAndValue } from '@/types/tokens'

const getAllTokens = async () => {
  const [rows] = await database.query('SELECT id, name, createdBy, createdAt FROM tokens')
  return rows as TokenObjectWithIdAndCreateAt[]
}

const getAllTokensValues = async () => {
  const [rows] = await database.query('SELECT id, name, value, createdBy, createdAt FROM tokens')
  return rows as TokenObjectWithIdAndCreateAtAndValue[]
}

const getTokenByName = async ({ name }: TokenOnlyName) => {
  const [rows] = await database.query('SELECT id, name, createdBy, createdAt FROM tokens WHERE name = (?)', [name])
  return rows as TokenObjectWithIdAndCreateAt[]
}

const createToken = async ({ name, createdBy }: TokenObject) => {
  const value = crypto.randomUUID()
  const hashedValue = await bcrypt.hash(value, 10)
  try {
    await database.query('INSERT INTO tokens (name, value, createdBy) VALUES (?, ?, ?)',
      [name, hashedValue, createdBy]
    )
    return { name, value, createdBy }
  } catch (error) {
    throw error
  }
}

const deleteToken = async ({ name }: TokenOnlyName) => {
  try {
    await database.query('DELETE FROM tokens WHERE (name) = (?)', [name])
  } catch (error) {
    throw error
  }
}

export default {
  getAllTokens,
  getAllTokensValues,
  getTokenByName,
  createToken,
  deleteToken
}
