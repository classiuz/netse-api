import { SERVER } from '@/lib/config'

export const START_MESSAGE = `
    🟩 SERVER STARTED - Running on ${SERVER.URL}:${SERVER.PORT}
`

export const GENERAL_MESSAGES = {
  CORS_ERROR: 'Not allowed by CORS',
  UNKNOWN_ERROR: 'An unknown error occurred.',
  DOCUMENTATION_TIP: 'Read the documentation in https://github.com/classiuz/netse-api#-documentation',
  ENVIRONMENT_NOT_FOUND: (environment: string | undefined) => `The Environment ${environment} was not found.`
}

export const SEED_MESSAGES = {
  START: 'Starting the database initialization process.',
  FINISH: (duration: string) => `The process ended, total duration: ${duration}.`,
  CREATED: (tableName: string) => `   - ✔ The "${tableName}" table was created successfully.`,
  OMITED: (tableName: string) => `   - ✘ The "${tableName}" table was already created, so it was omitted.`,
  ERROR: 'An error occurred while attempting to seed the database:'
}

export const USERS_MESSAGES = {
  NOT_FOUND: (username: string) => `The user ${username} was not found.`,
  CREATED: (username: string) => `User ${username} was created successfully.`,
  EMPTY_UPDATE: (username: string) => `To update user ${username} is necessary to provide some data.`,
  ALREADY_CREATED: (username: string) => `The user ${username} was already created.`,
  UPDATE: (username: string) => `The user ${username} was update correctly.`,
  DELETE: (username: string) => `The user ${username} was delete successfully.`
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

export const API_KEYS_MESSAGE = {
  CREATED: (name: string) => `Key ${name} was created successfully.`,
  NOT_FOUND: (name: string) => `The Key ${name} was not found.`,
  USER_DONT_EXIST: (username: string) => `The user ${username} not exist.`,
  ALREADY_CREATED: (name: string) => `The Key ${name} was already created.`,
  DELETE: (name: string) => `The Key ${name} was delete successfully.`
}

export const SERVICES_MESSAGE = {
  CREATED: (name: string) => `The service ${name} was created successfully.`,
  NOT_FOUND: (name: string) => `Service ${name} was not found.`,
  ALREADY_CREATED: (name: string) => `Service ${name} was already created.`,
  USER_DONT_EXIST: (username: string) => `The user ${username} not exist.`,
  EMPTY_UPDATE: (name: string) => `To update ${name} service is necessary to provide some data.`,
  UPDATE: (name: string) => `The service ${name} was update correctly.`,
  DELETE: (name: string) => `The service ${name} was delete successfully.`
}

export const PLANS_MESSAGE = {
  CREATED: (name: string) => `The plan ${name} was created successfully.`,
  NOT_FOUND: (name: string) => `Plan ${name} was not found.`,
  ALREADY_CREATED: (name: string) => `Plan ${name} was already created.`,
  USER_DONT_EXIST: (username: string) => `The user ${username} not exist.`,
  EMPTY_UPDATE: (name: string) => `To update ${name} plan is necessary to provide some data.`,
  UPDATE: (name: string) => `The plan ${name} was update correctly.`,
  DELETE: (name: string) => `The plan ${name} was delete successfully.`
}

export const ADDITIONAL_MESSAGE = {
  CREATED: (name: string) => `The additional ${name} was created successfully.`,
  NOT_FOUND: (name: string) => `Additional ${name} was not found.`,
  ALREADY_CREATED: (name: string) => `Additional ${name} was already created.`,
  USER_DONT_EXIST: (username: string) => `The user ${username} not exist.`,
  EMPTY_UPDATE: (name: string) => `To update ${name} additional is necessary to provide some data.`,
  UPDATE: (name: string) => `The additional ${name} was update correctly.`,
  DELETE: (name: string) => `The additional ${name} was delete successfully.`
}

export const SERVICES_AREAS_MESSAGE = {
  CREATED: (name: string) => `The service area ${name} was created successfully.`,
  NOT_FOUND: (name: string) => `Service area ${name} was not found.`,
  ALREADY_CREATED: (name: string) => `Service area ${name} was already created.`,
  USER_DONT_EXIST: (username: string) => `The user ${username} not exist.`,
  EMPTY_UPDATE: (name: string) => `To update ${name} service area is necessary to provide some data.`,
  UPDATE: (name: string) => `The service area ${name} was update correctly.`,
  DELETE: (name: string) => `The service area ${name} was delete successfully.`
}

export const SALES_MESSAGE = {
  CREATED: (salesName: string) => `The sales name ${salesName} was created successfully.`,
  NOT_FOUND: (id: number) => `Sales with id ${id} was not found.`,
  ALREADY_CREATED: (document: string) => `Sales with document ${document} was already created.`,
  USER_DONT_EXIST: (username: string) => `The user ${username} not exist.`,
  EMPTY_UPDATE: (id: string) => `To update sale id ${id} area is necessary to provide some data.`,
  UPDATE: (salesName: string) => `Sales name ${salesName} was update correctly.`,
  DELETE: (salesName: string) => `Sales name ${salesName} was delete successfully.`
}

export const AUTH_MESSAGE = {
  MISSING_KEY: 'API KEY is required.',
  INVALID_KEY: 'API KEY is invalid.'
}
