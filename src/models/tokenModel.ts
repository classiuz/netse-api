import bcrypt from 'bcrypt'
import crypto from 'crypto'
import pool from '@/config/database'
import getDate from '@/utils/getDate'
import type { TokenObject, TokenObjectWithId, TokenOnlyName, TokenObjectWithIdAndValue } from '@/types/tokens'

const getAllTokens = async () => {
  const [rows] = await pool.query('SELECT id, name, username, created FROM tokens')
  return rows as TokenObjectWithId[]
}

const getAllTokensValues = async () => {
  const [rows] = await pool.query('SELECT id, name, value, username, created FROM tokens')
  return rows as TokenObjectWithIdAndValue[]
}

const getTokenByName = async ({ name }: TokenOnlyName) => {
  const [rows] = await pool.query('SELECT id, name, username, created FROM tokens WHERE name = (?)', [name])
  return rows as TokenObjectWithId[]
}

const createToken = async ({ name, username }: TokenObject) => {
  const value = crypto.randomUUID()
  const hashedValue = await bcrypt.hash(value, 10)
  const date = getDate()

  try {
    await pool.query('INSERT INTO tokens (name, value, username, created) VALUES (?, ?, ?, ?)',
      [name, hashedValue, username, date]
    )
    return { name, username, value }
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
