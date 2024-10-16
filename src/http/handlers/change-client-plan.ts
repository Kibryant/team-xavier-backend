import {
  changeClientPlanSchemaBody,
  changeClientPlanSchemaParams,
} from '../schemas/change-client-plan-schema'
import { HTTP_STATUS_CODE } from '../types/http-status-code'
import { responseOkSchema } from '../schemas/response-ok-schema'
import { responseErrorSchema } from '../schemas/response-error-schema'
import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import { clientService } from '../service'

export const changeClientPlan: FastifyPluginAsyncZod = async app => {
  app.put(
    '/change-client-plan/:clientId',
    {
      schema: {
        params: changeClientPlanSchemaParams,
        body: changeClientPlanSchemaBody,
        response: {
          [HTTP_STATUS_CODE.OK]: responseOkSchema,
          [HTTP_STATUS_CODE.BAD_REQUEST]: responseErrorSchema,
          [HTTP_STATUS_CODE.NOT_FOUND]: responseErrorSchema,
        },
      },
    },
    async (request, reply) => {
      const { clientId } = request.params
      const { plan } = request.body

      const result = await clientService.changeClientPlan(clientId, plan)

      if (result.isFailure) {
        reply.status(result.statusCode).send({
          message: result.error as string,
          error: 'Somethin went wrong',
        })
        return
      }

      const updatedClient = result.value

      reply.status(HTTP_STATUS_CODE.OK).send({
        message: 'Client plan updated',
        data: updatedClient,
      })
    }
  )
}
