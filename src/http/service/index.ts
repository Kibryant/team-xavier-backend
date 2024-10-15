import { ClientService } from '../../core/services/client-service'
import { ClientRepositoryPrisma } from '../../database/repositories/client-repository-prisma'

export const clientRepository = new ClientRepositoryPrisma()
export const clientService = new ClientService(clientRepository)
