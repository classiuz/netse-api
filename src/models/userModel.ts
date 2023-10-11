const MOCKS_USER = [
  {
    userName: 'frodriguez',
    firstName: 'Franco',
    lastName: 'Rodríguez',
    email: 'frodriguez@netse.com.ar',
    role: 'Administrativo'
  }, {
    userName: 'pbernachea',
    firstName: 'Patricio',
    lastName: 'Bernachea',
    email: 'pbernachea@netse.com.ar',
    role: 'Soporte Técnico'
  }
]

export const getAllUsers = () => {
  return MOCKS_USER
}

export const getUserById = (id: number) => {
  return MOCKS_USER[id]
}
