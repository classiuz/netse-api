import type z from 'zod'
import { type groupsScheme } from '@/schemes/groups'

export type GroupObject = z.infer<typeof groupsScheme>

export type GroupOnlyName = Pick<GroupObject, 'name'>

export interface UpdateGroupProps {
  name: GroupObject['name']
  newData: Partial<GroupObject>
}

export interface GroupReturn extends GroupObject {
  id: number
}
