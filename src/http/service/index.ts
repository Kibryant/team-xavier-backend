import { ClientService } from '../../core/services/client-service'
import { prisma } from '../../database/config'
import { ClientRepositoryPrisma } from '../../database/repositories/client-repository-prisma'
import { BcryptHashService } from '../security/hash-service'

export const clientRepository = new ClientRepositoryPrisma(prisma)
export const clientService = new ClientService(clientRepository)
export const hashService = new BcryptHashService()
