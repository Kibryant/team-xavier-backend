import { z } from 'zod'

export const getUserDataSchema = z.object({
  token: z.string(),
})
