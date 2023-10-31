import type z from 'zod'
import { type usersScheme } from '@/schemes/users'

export type UserObject = z.infer<typeof usersScheme>

export type UserOnlyUsername = Pick<UserObject, 'username'>

export interface UserReturn extends UserObject {
  id: number
  createAT: string
}

export interface UsersModelsGenericProps {
  querys?: string[]
}

export interface GetUserProps {
  username: UserObject['username']
  selectFields?: [keyof UserObject] | []
}

export interface UpdateUserProps {
  username: UserObject['username']
  newData: Partial<UserObject>
}
