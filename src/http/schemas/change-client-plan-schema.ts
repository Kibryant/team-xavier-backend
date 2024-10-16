import { z } from 'zod'

export const changeClientPlanSchemaBody = z.object({
  plan: z.enum(['BASIC', 'PRO']),
})

export const changeClientPlanSchemaParams = z.object({
  clientId: z.string().cuid(),
})
