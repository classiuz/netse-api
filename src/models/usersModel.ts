import type { UpdateUserProps, UserObject, UserObjectWithId, UserOnlyUsername } from '@/types/user'

const MOCKS_USER: UserObjectWithId[] = [
  {
    id: 1,
    username: 'frodriguez',
    firstName: 'Franco',
    lastName: 'Rodríguez',
    email: 'frodriguez@netse.com.ar',
    rol: 'Administrativo'
  }, {
    id: 2,
    username: 'pbernachea',
    firstName: 'Patricio',
    lastName: 'Bernachea',
    email: 'pbernachea@netse.com.ar',
    rol: 'Soporte Técnico'
  }
]

const getAllUsers = () => {
  return MOCKS_USER
}

const getUserByUsername = ({ username }: UserOnlyUsername) => {
  return MOCKS_USER.find((user) => user.username === username)
}

const createUser = (username: UserObject) => {
  const id = MOCKS_USER.length + 1
  MOCKS_USER.push({ id, ...username })
  return username
}

const updateUser = ({ username, newData }: UpdateUserProps) => {
  const userIndex = MOCKS_USER.findIndex(user => user.username === username)

  MOCKS_USER[userIndex] = {
    ...MOCKS_USER[userIndex],
    ...newData
  }

  return MOCKS_USER[userIndex]
}

export default {
  getAllUsers,
  getUserByUsername,
  createUser,
  updateUser
}
