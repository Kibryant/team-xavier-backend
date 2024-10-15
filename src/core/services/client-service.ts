import type {
  CreateClientDto,
  Client,
  ClientPersistance,
  UpdateClientDto,
} from '../domain/client'
import type { ClientRepository } from '../repository/client-repository'
import { Result } from '../shared/result'

export class ClientService {
  constructor(private clientRepository: ClientRepository) {}

  async createClient(
    client: CreateClientDto
  ): Promise<Result<ClientPersistance>> {
    const clientExists = await this.clientRepository.getClientByEmail(
      client.email
    )

    if (clientExists) {
      return Result.fail('Client already exists', 409)
    }

    const user = await this.clientRepository.createClient(client)

    return Result.ok(201, user)
  }

  async deleteClient(clientId: string): Promise<Result<void>> {
    const client = await this.clientRepository.getClientById(clientId)

    if (!client) {
      return Result.fail('Client not found', 404)
    }

    await this.clientRepository.deleteClient(clientId)

    return Result.ok(200)
  }

  async updateClient(
    clientId: string,
    client: UpdateClientDto
  ): Promise<Result<ClientPersistance>> {
    const clientExists = await this.clientRepository.getClientById(clientId)

    if (!clientExists) {
      return Result.fail('Client not found', 404)
    }

    const updatedClient = await this.clientRepository.updateClient(
      clientId,
      client
    )

    return Result.ok(200, updatedClient)
  }

  async getClients(): Promise<Result<ClientPersistance[]>> {
    const clients = await this.clientRepository.getClients()

    if (!clients) {
      return Result.fail('Clients not found', 404)
    }

    return Result.ok(200, clients)
  }

  async getClientById(clientId: string): Promise<Result<ClientPersistance>> {
    const client = await this.clientRepository.getClientById(clientId)

    if (!client) {
      return Result.fail('Client not found', 404)
    }

    return Result.ok(200, client)
  }

  async getClientByEmail(email: string): Promise<Result<ClientPersistance>> {
    const client = await this.clientRepository.getClientByEmail(email)

    if (!client) {
      return Result.fail('Client not found', 404)
    }

    return Result.ok(200, client)
  }
}
