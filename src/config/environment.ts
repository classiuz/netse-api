import dotenv from 'dotenv'

dotenv.config()

export const { KEY, URL, DB_HOST, DB_USER, DB_PASSWORD, DB_NAME, PORT, ROOT_PATH } = process.env
