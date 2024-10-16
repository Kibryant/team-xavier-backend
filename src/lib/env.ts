import { z } from 'zod'

export const envSchema = z.object({
  PORT: z.coerce.number().default(3000),
  JWT_SIGNING_KEY: z.string(),
})

export type Env = z.infer<typeof envSchema>

export const env = envSchema.parse(process.env)
