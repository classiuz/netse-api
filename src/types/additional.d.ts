import type z from 'zod'
import { type additionalScheme } from '@/schemes/additionals'

export type AdditionalObject = z.infer<typeof additionalScheme>

export interface AdditionalReturn extends AdditionalObject {
  id: number
  createdAt: string
}
