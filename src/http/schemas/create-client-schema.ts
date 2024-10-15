import { z } from 'zod'

export const createClientSchema = z.object({
  name: z.string(),
  email: z.string().email(),
  password: z.string(),
  plan: z.enum(['BASIC', 'PRO']),
})
