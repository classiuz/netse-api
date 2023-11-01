import type z from 'zod'
import { type additionalScheme } from '@/schemes/additionals'

export type AdditionalObject = z.infer<typeof additionalScheme>

export type AdditionalOnlyName = Pick<AdditionalObject, 'name'>

export interface AdditionalReturn extends AdditionalObject {
  id: number
  createdAt: string
}

export interface AdditionalUpdateProps {
  name: AdditionalObject['name']
  newData: Partial<AdditionalObject>
}
