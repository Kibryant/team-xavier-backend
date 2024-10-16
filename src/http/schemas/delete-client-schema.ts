import { z } from 'zod'

export const deleteClientSchema = z.object({
  clientId: z.string().cuid(),
})
