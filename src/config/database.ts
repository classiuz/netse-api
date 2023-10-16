import mysql from 'mysql2/promise'
import dotenv from 'dotenv'

dotenv.config()

const pool = mysql.createPool({
  host: process.env.DB_HOST ?? 'localhost',
  user: process.env.DB_USER ?? 'defaultUser',
  password: process.env.DB_PASSWORD ?? 'defaultPassword',
  database: process.env.DB_NAME ?? 'defaultDatabase'
})

export default pool
