import mysql from 'mysql2/promise'
import { URL, PORT, ROOT_PATH, DB_HOST, DB_USER, DB_PASSWORD, DB_NAME } from '@/lib/environment'

export const SERVER = {
  URL: URL ?? 'http://localhost',
  PORT: PORT ?? 3090,
  ROOT_PATH: ROOT_PATH ?? '/api'
}

export const database = mysql.createPool({
  host: DB_HOST ?? 'localhost',
  user: DB_USER ?? 'defaultUser',
  password: DB_PASSWORD ?? 'defaultPassword',
  database: DB_NAME ?? 'defaultDatabase'
})
