import mysql from 'mysql2/promise'
import { DB_HOST, DB_USER, DB_PASSWORD, DB_NAME } from '@/config/environment'

const pool = mysql.createPool({
  host: DB_HOST ?? 'localhost',
  user: DB_USER ?? 'defaultUser',
  password: DB_PASSWORD ?? 'defaultPassword',
  database: DB_NAME ?? 'defaultDatabase'
})

export default pool
