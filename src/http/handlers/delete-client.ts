import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import { clientService } from '../service'
import { HTTP_STATUS_CODE } from '../types/http-status-code'
import { deleteClientSchema } from '../schemas/delete-client-schema'
import { responseOkSchema } from '../schemas/response-ok-schema'
import { responseErrorSchema } from '../schemas/response-error-schema'

export const deleteClient: FastifyPluginAsyncZod = async app => {
  app.delete(
    '/delete-client/:clientId',
    {
      schema: {
        params: deleteClientSchema,
        response: {
          200: responseOkSchema,
          404: responseErrorSchema,
          500: responseErrorSchema,
        },
      },
    },
    async (request, reply) => {
      const { clientId } = request.params

      const result = await clientService.deleteClient(clientId)

      if (result.isFailure) {
        if (result.statusCode === HTTP_STATUS_CODE.NOT_FOUND) {
          reply.status(HTTP_STATUS_CODE.NOT_FOUND).send({
            error: 'Not Found',
            message: result.error || 'Client not found',
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
        message: 'Client deleted successfully',
        data: null,
      })
    }
  )
}
