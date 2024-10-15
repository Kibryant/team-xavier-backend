import {
  Client,
  type CreateClientDto,
  type UpdateClientDto,
} from '../domain/client'
import type { ClientRepository } from '../repository/client-repository'

export class ClientRepositoryMock implements ClientRepository {
  private clients: Client[] = []

  async getClients(): Promise<Client[]> {
    return this.clients
  }

  async getClientById(id: string): Promise<Client | null> {
    const client = this.clients.find(client => client.getId() === id)

    if (!client) {
      return null
    }

    return client
  }

  async getClientByEmail(email: string): Promise<Client | null> {
    const client = this.clients.find(client => client.email === email)

    if (!client) {
      return null
    }

    return client
  }

  async createClient(createClientDto: CreateClientDto): Promise<Client> {
    const client = new Client({
      ...createClientDto,
    })

    this.clients.push(client)

    return client
  }

  async updateClient(
    id: string,
    updateClientDto: UpdateClientDto
  ): Promise<Client> {
    const clientIndex = this.clients.findIndex(client => client.getId() === id)

    if (clientIndex === -1) {
      throw new Error('Client not found')
    }

    const updatedClient: Client = new Client({
      ...this.clients[clientIndex],
      ...updateClientDto,
    })

    this.clients[clientIndex] = updatedClient

    return updatedClient
  }

  async deleteClient(id: string): Promise<void> {
    const clientIndex = this.clients.findIndex(client => client.getId() === id)

    if (clientIndex === -1) {
      throw new Error('Client not found')
    }

    this.clients.splice(clientIndex, 1)
  }
}
