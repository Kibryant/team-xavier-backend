import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import { responseErrorSchema } from '../schemas/response-error-schema'
import { responseOkSchema } from '../schemas/response-ok-schema'
import {
  updateClientSchemaBody,
  updateClientSchemaParams,
} from '../schemas/update-client-schema'
import { clientService } from '../service'
import { HTTP_STATUS_CODE } from '../types/http-status-code'

export const updateClient: FastifyPluginAsyncZod = async app => {
  app.put(
    '/update-client/:clientId',
    {
      schema: {
        body: updateClientSchemaBody,
        params: updateClientSchemaParams,
        response: {
          200: responseOkSchema,
          400: responseErrorSchema,
          404: responseErrorSchema,
          500: responseErrorSchema,
        },
      },
    },
    async (request, reply) => {
      const { clientId } = request.params
      const { name, email } = request.body

      const result = await clientService.updateClient(clientId, {
        name,
        email,
      })

      if (result.isFailure) {
        if (result.statusCode === HTTP_STATUS_CODE.NOT_FOUND) {
          reply.status(HTTP_STATUS_CODE.NOT_FOUND).send({
            error: 'Not Found',
            message: result.error || 'Client not found',
          })

          return
        }

        if (result.statusCode === HTTP_STATUS_CODE.BAD_REQUEST) {
          reply.status(HTTP_STATUS_CODE.BAD_REQUEST).send({
            error: 'Bad Request',
            message: result.error || 'Invalid data',
          })

          return
        }

        reply.status(HTTP_STATUS_CODE.INTERNAL_SERVER_ERROR).send({
          error: 'Internal Server Error',
          message: result.error || 'Internal server error',
        })

        return
      }

      reply.status(HTTP_STATUS_CODE.OK).send({
        message: 'Client updated successfully',
        data: result.value,
      })
    }
  )
}
