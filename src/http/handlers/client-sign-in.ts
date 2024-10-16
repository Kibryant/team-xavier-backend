import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import {
  clientSignInSchema,
  responseClientSignInErrorSchema,
  responseClientSignInOkSchema,
} from '../schemas/client-sign-in-schema'
import { clientService, hashService } from '../service'
import { HTTP_STATUS_CODE } from '../types/http-status-code'

export const clientSignIn: FastifyPluginAsyncZod = async app => {
  app.post(
    '/client-sign-in',
    {
      schema: {
        body: clientSignInSchema,
        response: {
          200: responseClientSignInOkSchema,
          400: responseClientSignInErrorSchema,
          404: responseClientSignInErrorSchema,
          500: responseClientSignInErrorSchema,
        },
      },
    },
    async (request, reply) => {
      const { email, password } = request.body

      const result = await clientService.getClientByEmail(email)

      if (result.isFailure) {
        if (result.statusCode === HTTP_STATUS_CODE.NOT_FOUND) {
          reply.status(HTTP_STATUS_CODE.NOT_FOUND).send({
            error: 'Not Found',
            message: 'Client not found',
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

      const passwordMatch = await hashService.compare(password, client.password)

      if (!passwordMatch) {
        reply.status(HTTP_STATUS_CODE.BAD_REQUEST).send({
          error: 'Unauthorized',
          message: 'Invalid credentials',
        })

        return
      }

      const token = app.jwt.sign({
        id: client.id,
        email: client.email,
        name: client.name,
      })

      reply.status(HTTP_STATUS_CODE.OK).send({
        token,
        message: 'Client signed in successfully',
      })
    }
  )
}
