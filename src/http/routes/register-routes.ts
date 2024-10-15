import type { FastifyInstance } from 'fastify'
import { ClientService } from '../../core/services/client-service'
import { ClientRepositoryPrisma } from '../../database/repositories/client-repository-prisma'
import { HTTP_STATUS_CODE } from '../types/http-status-code'
import { getClients } from '../handlers/get-clients'
import { createClient } from '../handlers/create-client'

const clientRepository = new ClientRepositoryPrisma()
const clientService = new ClientService(clientRepository)

export async function registerRoutes(app: FastifyInstance) {
  app.register(getClients)
  app.register(createClient)
}
