export interface UserObject {
  username: string
  email: string
  firstName: string
  lastName: string
  role: string
}

export interface UserObjectWithId extends UserObject {
  id: number
}

export interface UpdateUserProps {
  username: UserObject['username']
  newData: Partial<UserObject>
}

export type UserOnlyUsername = Pick<UserObject, 'username'>
