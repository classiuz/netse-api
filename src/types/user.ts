import type z from 'zod'
import { type usersScheme } from '@/schemes/users'

export type UserObject = z.infer<typeof usersScheme>

export type UserOnlyUsername = Pick<UserObject, 'username'>

export interface UserObjectWithId extends UserObject {
  id: number
}

export interface UpdateUserProps {
  username: UserObject['username']
  newData: Partial<UserObject>
}
