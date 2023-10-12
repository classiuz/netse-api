export const RESPONSE_CODES = {
  200: 200,
  401: 401,
  404: 404,
  422: 422,
  500: 500
}

export const RESPONSE_STATUS = {
  200: 'OK',
  401: 'FORBIDDEN',
  404: 'NOT_FOUND',
  422: 'INVALID_REQUEST',
  500: 'UNKNOWN_ERROR'
}

export const RESPONSE_MESSAGES = {
  200: 'The request was proccess succesfully.',
  401: 'KEY was not provided or it is invalid.',
  404: 'The request you are looking for was not found.',
  422: 'The request are invalid.',
  500: 'An Unknown error ocurred.'
}
