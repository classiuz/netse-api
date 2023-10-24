import bcrypt from 'bcrypt'
import crypto from 'crypto'
import pool from '@/config/database'
import getDate from '@/utils/getDate'
import type { TokenObject, TokenObjectWithIdAndCreateAt, TokenOnlyName, TokenObjectWithIdAndCreateAtAndValue } from '@/types/tokens'

const createTable = async () => {
  await pool.query(`
    CREATE TABLE IF NOT EXISTS tokens (
      id INT PRIMARY KEY AUTO_INCREMENT,
      tokenName VARCHAR(100) NOT NULL UNIQUE,
      tokenValue VARCHAR(300) NOT NULL,
      username VARCHAR(255) NOT NULL,
      FOREIGN KEY (username) REFERENCES users(username),
      createdAt VARCHAR(25) NOT NULL
    )
  `)
}

void createTable()

const getAllTokens = async () => {
  const [rows] = await pool.query('SELECT id, tokenName, username, createdAt FROM tokens')
  return rows as TokenObjectWithIdAndCreateAt[]
}

const getAllTokensValues = async () => {
  const [rows] = await pool.query('SELECT id, tokenName, tokenValue, username, createdAt FROM tokens')
  return rows as TokenObjectWithIdAndCreateAtAndValue[]
}

const getTokenByName = async ({ tokenName }: TokenOnlyName) => {
  const [rows] = await pool.query('SELECT id, tokenName, username, createdAt FROM tokens WHERE tokenName = (?)', [tokenName])
  return rows as TokenObjectWithIdAndCreateAt[]
}

const createToken = async ({ tokenName, username }: TokenObject) => {
  const value = crypto.randomUUID()
  const hashedValue = await bcrypt.hash(value, 10)
  const date = getDate()

  try {
    await pool.query('INSERT INTO tokens (tokenName, tokenValue, username, createdAt) VALUES (?, ?, ?, ?)',
      [tokenName, hashedValue, username, date]
    )
    return { tokenName, username, value }
  } catch (error) {
    throw error
  }
}

const deleteToken = async ({ tokenName }: TokenOnlyName) => {
  try {
    await pool.query('DELETE FROM tokens WHERE (tokenName) = (?)', [tokenName])
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
