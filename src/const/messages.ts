import { URL, PORT } from '@/config/server'

export const START_MESSAGE = `
    🟩 SERVER STARTED - Running on ${URL}:${PORT}
`

export const GENERAL_MESSAGES = {
  CORS_ERROR: 'Not allowed by CORS',
  UNKNOWN_ERROR: 'An unknown error occurred.',
  DOCUMENTATION_TIP: 'Read the documentation in https://github.com/classiuz/netse-api#-documentation',
  ENVIRONMENT_NOT_FOUND: (environment: string | undefined) => `The Environment ${environment} was not found.`
}

export const USERS_MESSAGES = {
  NOT_FOUND: (username: string) => `The user ${username} was not found.`,
  CREATED: (username: string) => `User ${username} was created successfully.`,
  ALREADY_CREATED: (username: string) => `The user ${username} was already created.`,
  UPDATE: (username: string) => `The user ${username} was update correctly.`,
  DELETE: (username: string) => `The user ${username} was delete successfully.`
}

export const BLACKLIST_MESSAGE = {
  NOT_FOUND: (clientName: string) => `The blacklist with the client ${clientName} was not found.`,
  CREATED: (clientName: string) => `BlackList client ${clientName} was created successfully.`,
  USER_DONT_EXIST: (username: string) => `The user ${username} not exist.`,
  ALREADY_CREATED: (clientName: string) => `Blacklist with the client ${clientName} was already created.`,
  UPDATE: (clientName: string) => `The blacklist with the client ${clientName} was update correctly.`,
  DELETE: (clientName: string) => `The blacklist with the client ${clientName} was delete successfully.`
}

export const TOKEN_MESSAGE = {
  CREATED: (tokenName: string) => `Token ${tokenName} was created successfully.`,
  NOT_FOUND: (tokenName: string) => `The Token ${tokenName} was not found.`,
  USER_DONT_EXIST: (username: string) => `The user ${username} not exist.`,
  ALREADY_CREATED: (tokenName: string) => `The Token ${tokenName} was already created.`,
  DELETE: (tokenName: string) => `The Token ${tokenName} was delete successfully.`
}

export const AUTH_MESSAGE = {
  MISSING_KEY: 'API Token KEY is required.',
  INVALID_KEY: 'API Token KEY is invalid.'
}
