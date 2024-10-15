import { z } from 'zod'

export const responseErrorSchema = z.object({
  error: z.string(),
  message: z.string(),
})
