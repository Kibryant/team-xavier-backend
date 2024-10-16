import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import { HTTP_STATUS_CODE } from '../types/http-status-code'
import { createClientSchema } from '../schemas/create-client-schema'
import { responseOkSchema } from '../schemas/response-ok-schema'
import { responseErrorSchema } from '../schemas/response-error-schema'
import { clientService, hashService } from '../service'

export const createClient: FastifyPluginAsyncZod = async app => {
  app.post(
    '/create-client',
    {
      schema: {
        body: createClientSchema,
        response: {
          201: responseOkSchema,
          400: responseErrorSchema,
          409: responseErrorSchema,
          500: responseErrorSchema,
        },
      },
    },
    async (request, reply) => {
      const { name, email, password, plan } = request.body

      const hashedPassword = await hashService.hash(password)

      const result = await clientService.createClient({
        name,
        email,
        password: hashedPassword,
        plan,
      })

      if (result.isFailure) {
        if (result.statusCode === HTTP_STATUS_CODE.CONFLICT) {
          return reply.status(result.statusCode).send({
            error: 'Conflict',
            message: result.error || 'Client already exists',
          })
        }

        return reply.status(result.statusCode).send({
          error: 'Internal Server Error',
          message: result.error || 'Something went wrong',
        })
      }

      reply.status(HTTP_STATUS_CODE.CREATED).send({
        message: 'Client created successfully',
        data: result.value,
      })
    }
  )
}
