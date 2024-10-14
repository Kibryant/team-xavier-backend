import postgres from 'postgres'
import { drizzle as drizzleConnection } from 'drizzle-orm/postgres-js'
import * as schema from './schemas'
import { env } from '../lib/env'

export const client = postgres(env.DATABASE_URL)
export const db = drizzleConnection(client, { schema })
