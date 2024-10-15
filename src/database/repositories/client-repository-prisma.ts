import type {
  CreateClientDto,
  Client,
  UpdateClientDto,
} from '../../core/domain/client'
import type { ClientRepository } from '../../core/repository/client-repository'

export class ClientRepositoryPrisma implements ClientRepository {
  async createClient(Client: CreateClientDto): Promise<Client> {
    throw new Error('Method not implemented.')
  }
  async updateClient(id: string, client: UpdateClientDto): Promise<Client> {
    throw new Error('Method not implemented.')
  }
  async addClient(client: CreateClientDto): Promise<Client> {
    throw new Error('Method not implemented.')
  }

  async deleteClient(clientId: string): Promise<void> {
    throw new Error('Method not implemented.')
  }

  async getClientById(clientId: string): Promise<Client> {
    throw new Error('Method not implemented.')
  }

  async getClientByEmail(email: string): Promise<Client> {
    throw new Error('Method not implemented.')
  }

  async getClients(): Promise<Client[]> {
    throw new Error('Method not implemented.')
  }
}
