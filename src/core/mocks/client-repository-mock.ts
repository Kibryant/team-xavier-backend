import type { Client, CreateClientDto, UpdateClientDto } from '../domain/client'
import type { CreatePhotoDto, Photo } from '../domain/photo'
import type { ClientRepository } from '../repository/client-repository'

export class ClientRepositoryMock implements ClientRepository {
  private clients: Client[] = []

  async getClients(): Promise<{ clients: Client[] }> {
    return { clients: this.clients }
  }

  async getClientById(id: string): Promise<Client | null> {
    const client = this.clients.find(client => client.id === id)

    return client || null
  }

  async createClient(createClientDto: CreateClientDto): Promise<Client> {
    const newClient: Client = {
      id: this.generateId(),
      ...createClientDto,
      createdAt: new Date(),
      updatedAt: new Date(),
      photos: [],
    }

    this.clients.push(newClient)

    return newClient
  }

  async updateClient(
    id: string,
    updateClientDto: UpdateClientDto
  ): Promise<Client> {
    const clientIndex = this.clients.findIndex(client => client.id === id)

    if (clientIndex === -1) {
      throw new Error('Client not found')
    }

    const updatedClient = {
      ...this.clients[clientIndex],
      ...updateClientDto,
    }

    this.clients[clientIndex] = updatedClient

    return updatedClient
  }

  async deleteClient(id: string): Promise<void> {
    const clientIndex = this.clients.findIndex(client => client.id === id)

    if (clientIndex === -1) {
      throw new Error('Client not found')
    }

    this.clients.splice(clientIndex, 1)
  }

  async addPhoto(userId: string, photo: CreatePhotoDto): Promise<void> {
    const clientIndex = this.clients.findIndex(client => client.id === userId)

    if (clientIndex === -1) {
      throw new Error('Client not found')
    }

    const newPhoto: Photo = {
      id: this.generateId(),
      ...photo,
      createdAt: new Date(),
      updatedAt: new Date(),
    }

    this.clients[clientIndex].photos.push(newPhoto)
  }

  private generateId(): string {
    return Math.random().toString(36).split('.')[1]
  }
}
