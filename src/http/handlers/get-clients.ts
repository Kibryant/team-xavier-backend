import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import { responseOkSchema } from '../schemas/response-ok-schema'
import { HTTP_STATUS_CODE } from '../types/http-status-code'
import { responseErrorSchema } from '../schemas/response-error-schema'
import { clientService } from '../service'

export const getClients: FastifyPluginAsyncZod = async app => {
  app.get(
    '/clients',
    {
      schema: {
        response: {
          200: responseOkSchema,
          500: responseErrorSchema,
        },
      },
    },
    async (request, reply) => {
      const result = await clientService.getClients()

      if (result.isFailure) {
        return reply.status(HTTP_STATUS_CODE.INTERNAL_SERVER_ERROR).send({
          error: 'Internal Server Error',
          message: result.error || 'An error occurred while fetching clients',
        })
      }

      reply.status(HTTP_STATUS_CODE.OK).send({
        message: 'Clients fetched successfully',
        data: result.value,
      })
    }
  )
}
