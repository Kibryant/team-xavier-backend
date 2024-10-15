import { z } from 'zod'

export const responseOkSchema = z.object({
  message: z.string(),
  data: z.any(),
})
