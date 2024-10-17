import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import { clientService } from '../service'
import { HTTP_STATUS_CODE } from '../types/http-status-code'
import {
  clientSignUpSchema,
  responseClientSignUpErrorSchema,
  responseClientSignUpOkSchema,
} from '../schemas/client-sign-up-schema'
import { env } from '../../lib/env'

export const clientSignUp: FastifyPluginAsyncZod = async app => {
  app.post(
    '/client-sign-up',
    {
      schema: {
        body: clientSignUpSchema,
        response: {
          200: responseClientSignUpOkSchema,
          400: responseClientSignUpErrorSchema,
          409: responseClientSignUpErrorSchema,
          500: responseClientSignUpErrorSchema,
        },
      },
    },
    async (request, reply) => {
      const { name, email, password, accessCode } = request.body

      if (accessCode !== env.ACCESS_CODE) {
        reply.status(HTTP_STATUS_CODE.BAD_REQUEST).send({
          error: 'Bad Request',
          message: 'Invalid access code',
        })

        return
      }

      const result = await clientService.createClient({
        name,
        email,
        password,
        plan: 'FREE',
      })

      if (result.isFailure) {
        if (result.statusCode === HTTP_STATUS_CODE.BAD_REQUEST) {
          reply.status(HTTP_STATUS_CODE.BAD_REQUEST).send({
            error: 'Bad Request',
            message: 'Invalid data',
          })

          return
        }

        if (result.statusCode === HTTP_STATUS_CODE.CONFLICT) {
          reply.status(HTTP_STATUS_CODE.CONFLICT).send({
            error: 'Conflict',
            message: 'Client already exists',
          })

          return
        }

        reply.status(HTTP_STATUS_CODE.INTERNAL_SERVER_ERROR).send({
          error: 'Internal Server Error',
          message: 'Something went wrong',
        })

        return
      }

      const client = result.value

      const token = app.jwt.sign({
        id: client.id,
        email: client.email,
      })

      reply.status(HTTP_STATUS_CODE.OK).send({
        token,
      })
    }
  )
}
