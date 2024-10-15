import {
  Client,
  type ClientPersistance,
  type CreateClientDto,
  type UpdateClientDto,
} from '../domain/client'
import { ClientMapper } from '../mapper/client-mapper'
import type { ClientRepository } from '../repository/client-repository'

export class ClientRepositoryMock implements ClientRepository {
  private clients: Client[] = []

  async getClients(): Promise<ClientPersistance[]> {
    return this.clients.map(client => ClientMapper.toPersistence(client))
  }

  async getClientsPaginated(
    page: number,
    limit: number
  ): Promise<ClientPersistance[]> {
    return this.clients
      .slice((page - 1) * limit, page * limit)
      .map(client => ClientMapper.toPersistence(client))
  }

  async getClientById(id: string): Promise<ClientPersistance | null> {
    const client = this.clients.find(client => client.getId() === id)

    if (!client) {
      return null
    }

    return ClientMapper.toPersistence(client)
  }

  async getClientByEmail(email: string): Promise<ClientPersistance | null> {
    const client = this.clients.find(client => client.email === email)

    if (!client) {
      return null
    }

    return ClientMapper.toPersistence(client)
  }

  async createClient(
    createClientDto: CreateClientDto
  ): Promise<ClientPersistance> {
    const client = new Client({
      ...createClientDto,
    })

    this.clients.push(client)

    return ClientMapper.toPersistence(client)
  }

  async updateClient(
    id: string,
    updateClientDto: UpdateClientDto
  ): Promise<ClientPersistance> {
    const clientIndex = this.clients.findIndex(client => client.getId() === id)

    if (clientIndex === -1) {
      throw new Error('Client not found')
    }

    const updatedClient: Client = new Client({
      ...this.clients[clientIndex],
      ...updateClientDto,
    })

    this.clients[clientIndex] = updatedClient

    return ClientMapper.toPersistence(updatedClient)
  }

  async deleteClient(id: string): Promise<void> {
    const clientIndex = this.clients.findIndex(client => client.getId() === id)

    if (clientIndex === -1) {
      throw new Error('Client not found')
    }

    this.clients.splice(clientIndex, 1)
  }
}
