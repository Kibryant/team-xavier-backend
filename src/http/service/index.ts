import { ClientService } from '../../core/services/client-service'
import { prisma } from '../../database/config'
import { ClientRepositoryPrisma } from '../../database/repositories/client-repository-prisma'

export const clientRepository = new ClientRepositoryPrisma(prisma)
export const clientService = new ClientService(clientRepository)
