import { z } from 'zod'

export const clientSignInSchema = z.object({
  email: z.string().email(),
  password: z.string().min(4),
})

export const responseClientSignInOkSchema = z.object({
  token: z.string(),
  message: z.string(),
})

export const responseClientSignInErrorSchema = z.object({
  error: z.string(),
  message: z.string(),
})
