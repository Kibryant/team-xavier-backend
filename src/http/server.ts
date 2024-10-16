import Fastify from 'fastify'
import {
  serializerCompiler,
  validatorCompiler,
  type ZodTypeProvider,
} from 'fastify-type-provider-zod'
import { registerRoutes } from './routes/register-routes'
import { HTTP_STATUS_CODE } from './types/http-status-code'
import { env } from '../lib/env'
import { registerMiddlewares } from './middleware'

export const app = Fastify({
  logger: true,
}).withTypeProvider<ZodTypeProvider>()

const start = async () => {
  try {
    app.addHook('onRequest', async (request, reply) => {
      try {
        const { url } = request

        if (url === '/client-sign-in') {
          return
        }

        const token = request.headers.authorization?.split(' ')[1] || ''

        const decoded = app.jwt.verify(token)

        if (!decoded) {
          reply.status(HTTP_STATUS_CODE.UNAUTHORIZED).send({
            error: 'Unauthorized',
            message: 'Invalid token',
          })
        }

        request.user = decoded
      } catch {
        reply.status(HTTP_STATUS_CODE.UNAUTHORIZED).send({
          error: 'Unauthorized',
          message: 'Invalid token',
        })
      }
    })

    app.setErrorHandler((error, request, reply) => {
      if (error.statusCode === HTTP_STATUS_CODE.BAD_REQUEST) {
        reply.status(HTTP_STATUS_CODE.BAD_REQUEST).send({
          error: 'Bad Request',
          message: 'Invalid data',
        })
      }
    })

    app.setValidatorCompiler(validatorCompiler)
    app.setSerializerCompiler(serializerCompiler)

    await registerMiddlewares(app)
    await registerRoutes(app)

    await app.listen({ port: env.PORT })
  } catch (err) {
    app.log.error(err)
    process.exit(1)
  }
}

start()
