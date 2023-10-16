import dotenv from 'dotenv'

dotenv.config()

export const URL = process.env.HOST ?? 'http://localhost'
export const PORT = process.env.PORT ?? 3090
export const ROOT_PATH = process.env.ROOT_PATH ?? '/api'
