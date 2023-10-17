import { URL as EN_URL, PORT as EN_PORT, ROOT_PATH as EN_ROOT_PATH } from '@/config/environment'

export const URL = EN_URL ?? 'http://localhost'
export const PORT = EN_PORT ?? 3090
export const ROOT_PATH = EN_ROOT_PATH ?? '/api'
