import Fastify from 'fastify'
import {
  serializerCompiler,
  validatorCompiler,
  type ZodTypeProvider,
} from 'fastify-type-provider-zod'
import { registerRoutes } from './routes/register-routes'
import { HTTP_STATUS_CODE } from './types/http-status-code'

export const app = Fastify({
  logger: true,
}).withTypeProvider<ZodTypeProvider>()

const start = async () => {
  try {
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

    app.register(registerRoutes)

    await app.listen({ port: 3000 })
  } catch (err) {
    app.log.error(err)
    process.exit(1)
  }
}

start()
