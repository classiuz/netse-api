import { URL, PORT } from '@/config/server'

export const START_MESSAGE = `
    🟩 SERVER STARTED - Running on ${URL}:${PORT}
`

export const USERS_MESSAGES = {
  NOT_FOUND: (username: string) => `The user ${username} was not found.`,
  CREATED: (username: string) => `User ${username} was created successfully`,
  ALREADY_CREATED: (username: string) => `The user ${username} was already created.`,
  UPDATE: (username: string) => `The user ${username} was update correctly.`
}
