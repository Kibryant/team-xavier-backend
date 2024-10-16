import type { FastifyInstance } from 'fastify'
import fastifyCors from '@fastify/cors'
import fastifyJwt from '@fastify/jwt'
import { env } from '../../lib/env'

export async function registerMiddlewares(app: FastifyInstance) {
  app.register(fastifyCors, {
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
  })

  app.register(fastifyJwt, {
    secret: env.JWT_SIGNING_KEY,
  })
}
