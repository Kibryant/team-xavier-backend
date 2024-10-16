import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import { HTTP_STATUS_CODE } from '../types/http-status-code'

export const getClientData: FastifyPluginAsyncZod = async app => {
  app.get('/get-client-data', async (request, reply) => {
    reply.status(HTTP_STATUS_CODE.OK).send({
      message: 'Client data retrieved successfully',
      data: request.user,
    })
  })
}
