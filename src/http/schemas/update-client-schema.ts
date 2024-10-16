import { z } from 'zod'

export const updateClientSchemaBody = z.object({
  name: z.string().min(1).max(255).optional(),
  email: z.string().email().optional(),
})

export const updateClientSchemaParams = z.object({
  clientId: z.string().cuid(),
})
