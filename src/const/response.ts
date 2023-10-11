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
  200: 'La solicitud se proceso correctamente.',
  401: 'Se requiere un TOKEN para esta solicitud.',
  404: 'No se encontró la solicitud.',
  422: 'La solicitud es inválida.',
  500: 'Ocurrió un error inesperado.'
}
