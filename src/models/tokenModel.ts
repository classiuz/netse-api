import bcrypt from 'bcrypt'
import crypto from 'crypto'
import pool from '@/config/database'
import getDate from '@/utils/getDate'
import type { TokenObject, TokenObjectWithIdAndCreateAt, TokenOnlyName, TokenObjectWithIdAndCreateAtAndValue } from '@/types/tokens'

const getAllTokens = async () => {
  const [rows] = await pool.query('SELECT id, name, createdBy, createdAt FROM tokens')
  return rows as TokenObjectWithIdAndCreateAt[]
}

const getAllTokensValues = async () => {
  const [rows] = await pool.query('SELECT id, name, value, createdBy, createdAt FROM tokens')
  return rows as TokenObjectWithIdAndCreateAtAndValue[]
}

const getTokenByName = async ({ name }: TokenOnlyName) => {
  const [rows] = await pool.query('SELECT id, name, createdBy, createdAt FROM tokens WHERE name = (?)', [name])
  return rows as TokenObjectWithIdAndCreateAt[]
}

const createToken = async ({ name, createdBy }: TokenObject) => {
  const value = crypto.randomUUID()
  const hashedValue = await bcrypt.hash(value, 10)
  const date = getDate()

  try {
    await pool.query('INSERT INTO tokens (name, value, createdBy, createdAt) VALUES (?, ?, ?, ?)',
      [name, hashedValue, createdBy, date]
    )
    return { name, createdBy, value }
  } catch (error) {
    throw error
  }
}

const deleteToken = async ({ name }: TokenOnlyName) => {
  try {
    await pool.query('DELETE FROM tokens WHERE (name) = (?)', [name])
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
