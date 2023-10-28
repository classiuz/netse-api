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
  EMPTY_UPDATE: (username: string) => `To update user ${username} is necessary to provide some data.`,
  ALREADY_CREATED: (username: string) => `The user ${username} was already created.`,
  UPDATE: (username: string) => `The user ${username} was update correctly.`,
  DELETE: (username: string) => `The user ${username} was delete successfully.`
}

export const CLIENT_MESSAGE = {
  NOT_FOUND: (id: string) => `The client with id ${id} was not found.`,
  CREATED: (clientName: string) => `Client ${clientName} was created successfully.`,
  EMPTY_UPDATE: (id: string) => `To update the client with id ${id} is necessary to provide some data.`,
  ALREADY_CREATED: (id: string | number) => `Client with id ${id} was already created.`,
  CLIENT_DONT_EXIST: (id: string | number) => `The client ${id} not exist.`,
  UPDATE: (id: string | number) => `The client with id ${id} was update correctly.`,
  DELETE: (id: number | undefined | null) => `The client with id ${id} was delete successfully.`
}

export const BLACKLIST_MESSAGE = {
  NOT_FOUND: (clientId: string) => `The blacklist with the client ${clientId} was not found.`,
  CREATED: (clientId: string) => `BlackList client id ${clientId} was created successfully.`,
  USER_DONT_EXIST: (username: string) => `The user ${username} not exist.`,
  EMPTY_UPDATE: (clientId: string) => `To update the blacklist with client id ${clientId} is necessary to provide some data.`,
  ALREADY_CREATED: (clientId: string) => `Blacklist with the client id ${clientId} was already created.`,
  UPDATE: (clientId: string) => `The blacklist with the client ${clientId} was update correctly.`,
  DELETE: (clientId: string) => `The blacklist with the client ${clientId} was delete successfully.`
}

export const TOKEN_MESSAGE = {
  CREATED: (name: string) => `Token ${name} was created successfully.`,
  NOT_FOUND: (name: string) => `The Token ${name} was not found.`,
  USER_DONT_EXIST: (username: string) => `The user ${username} not exist.`,
  ALREADY_CREATED: (name: string) => `The Token ${name} was already created.`,
  DELETE: (name: string) => `The Token ${name} was delete successfully.`
}

export const GROUPS_MESSAGE = {
  CREATED: (name: string) => `Group ${name} was created successfully.`,
  NOT_FOUND: (name: string) => `The group ${name} was not found.`,
  ALREADY_CREATED: (name: string) => `The group ${name} was already created.`,
  EMPTY_UPDATE: (name: string) => `To update ${name} is necessary to provide some data.`,
  UPDATE: (name: string) => `The group ${name} was update correctly.`,
  DELETE: (name: string) => `The group ${name} was delete successfully.`
}

export const SERVICES_MESSAGE = {
  CREATED: (name: string) => `The service ${name} was created successfully.`,
  NOT_FOUND: (name: string) => `Service ${name} was not found.`,
  ALREADY_CREATED: (name: string) => `Service ${name} was already created.`,
  USER_DONT_EXIST: (username: string) => `The user ${username} not exist.`,
  EMPTY_UPDATE: (name: string) => `To update ${name} is necessary to provide some data.`,
  UPDATE: (name: string) => `The service ${name} was update correctly.`,
  DELETE: (name: string) => `The service ${name} was delete successfully.`
}

export const AUTH_MESSAGE = {
  MISSING_KEY: 'API Token KEY is required.',
  INVALID_KEY: 'API Token KEY is invalid.'
}
