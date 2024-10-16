import type { PrismaClient } from '@prisma/client'
import {
  type CreateClientDto,
  type UpdateClientDto,
  type ClientPersistance,
  Client,
  type Plan,
} from '../../core/domain/client'
import type { ClientRepository } from '../../core/repository/client-repository'

export class ClientRepositoryPrisma implements ClientRepository {
  private prisma: PrismaClient

  constructor(prisma: PrismaClient) {
    this.prisma = prisma
  }

  async createClient({
    name,
    email,
    password,
    plan,
  }: CreateClientDto): Promise<ClientPersistance> {
    const clientCreated = await this.prisma.client.create({
      data: {
        name: name,
        email: email,
        password: password,
        plan,
      },
    })

    return {
      id: clientCreated.id,
      name: clientCreated.name,
      email: clientCreated.email,
      password: clientCreated.password,
      plan: clientCreated.plan,
      createdAt: clientCreated.createdAt,
      updatedAt: clientCreated.updatedAt,
    }
  }

  async updateClient(
    id: string,
    client: UpdateClientDto
  ): Promise<ClientPersistance> {
    const clientUpdated = await this.prisma.client.update({
      where: {
        id: id,
      },
      data: {
        name: client.name,
        email: client.email,
      },
    })

    return {
      id: clientUpdated.id,
      name: clientUpdated.name,
      email: clientUpdated.email,
      password: clientUpdated.password,
      plan: clientUpdated.plan,
      createdAt: clientUpdated.createdAt,
      updatedAt: clientUpdated.updatedAt,
    }
  }

  async changeClientPlan(id: string, plan: Plan): Promise<ClientPersistance> {
    const clientUpdated = await this.prisma.client.update({
      where: {
        id: id,
      },
      data: {
        plan: plan,
      },
    })

    return {
      id: clientUpdated.id,
      name: clientUpdated.name,
      email: clientUpdated.email,
      password: clientUpdated.password,
      plan: clientUpdated.plan,
      createdAt: clientUpdated.createdAt,
      updatedAt: clientUpdated.updatedAt,
    }
  }

  async deleteClient(clientId: string): Promise<void> {
    await this.prisma.client.delete({
      where: {
        id: clientId,
      },
    })
  }

  async getClientById(clientId: string): Promise<ClientPersistance | null> {
    const client = await this.prisma.client.findUnique({
      where: {
        id: clientId,
      },
    })

    if (!client) {
      return null
    }

    return {
      id: client.id,
      name: client.name,
      email: client.email,
      password: client.password,
      plan: client.plan,
      createdAt: client.createdAt,
      updatedAt: client.updatedAt,
    }
  }

  async getClientByEmail(email: string): Promise<ClientPersistance | null> {
    const client = await this.prisma.client.findUnique({
      where: {
        email: email,
      },
    })

    if (!client) {
      return null
    }

    return {
      id: client.id,
      name: client.name,
      email: client.email,
      password: client.password,
      plan: client.plan,
      createdAt: client.createdAt,
      updatedAt: client.updatedAt,
    }
  }

  async getClients(): Promise<ClientPersistance[]> {
    const clients = await this.prisma.client.findMany()

    return clients as ClientPersistance[]
  }

  async getClientsPaginated(
    page: number,
    limit: number
  ): Promise<ClientPersistance[]> {
    const skip = (page - 1) * limit
    const clients = await this.prisma.client.findMany({
      skip,
      take: limit,
    })

    return clients as ClientPersistance[]
  }
}
