import { z } from 'zod'

export const clientSignUpSchema = z.object({
  accessCode: z.string(),
  name: z.string(),
  email: z.string().email(),
  password: z.string().min(6),
})

export const responseClientSignUpOkSchema = z.object({
  token: z.string(),
})

export const responseClientSignUpErrorSchema = z.object({
  error: z.string(),
  message: z.string(),
})
