import type { FastifyInstance } from 'fastify'
import { getClients } from '../handlers/get-clients'
import { createClient } from '../handlers/create-client'
import { deleteClient } from '../handlers/delete-client'
import { updateClient } from '../handlers/update-client'
import { changeClientPlan } from '../handlers/change-client-plan'
import { clientSignIn } from '../handlers/client-sign-in'
import { getClientData } from '../handlers/get-client-data'
import { clientSignUp } from '../handlers/client-sign-up'

export async function registerRoutes(app: FastifyInstance) {
  app.register(getClients, { prefix: '/owner' })
  app.register(createClient, { prefix: '/owner' })
  app.register(deleteClient, { prefix: '/owner' })
  app.register(updateClient, { prefix: '/owner' })
  app.register(changeClientPlan)
  app.register(clientSignIn)
  app.register(getClientData)
  app.register(clientSignUp)
}
