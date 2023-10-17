export const RESPONSE_CODES = {
  200: 200,
  201: 201,
  400: 400,
  401: 401,
  404: 404,
  409: 409,
  500: 500
}

export const RESPONSE_STATUS = {
  200: 'OK',
  201: 'CREATED',
  400: 'BAD_REQUEST',
  401: 'FORBIDDEN',
  404: 'NOT_FOUND',
  409: 'CONFLICT',
  500: 'UNKNOWN_ERROR'
}

export const RESPONSE_MESSAGES = {
  200: 'The request was proccess succesfully.',
  201: 'The resource was created succesfully.',
  400: 'The request it is invalid.',
  401: 'KEY was not provided or it is invalid.',
  404: 'The request you are looking for was not found.',
  409: 'They was a conflict with the resource sended.',
  500: 'An Unknown error ocurred.'
}
