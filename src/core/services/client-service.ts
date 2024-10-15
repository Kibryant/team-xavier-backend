import type { CreateClientDto, Client } from '../domain/client'
import type { ClientRepository } from '../repository/client-repository'
import { Result } from '../shared/result'

export class ClientService {
  constructor(private clientRepository: ClientRepository) {}

  async createClient(client: CreateClientDto): Promise<Result<Client>> {
    const clientExists = await this.clientRepository.getClientByEmail(
      client.email
    )

    if (clientExists) {
      return Result.fail('Client already exists')
    }

    const user = await this.clientRepository.createClient(client)

    return Result.ok(user)
  }

  async deleteClient(clientId: string): Promise<Result<void>> {
    const client = await this.clientRepository.getClientById(clientId)

    if (!client) {
      return Result.fail('Client not found')
    }

    await this.clientRepository.deleteClient(clientId)

    return Result.ok()
  }

  async updateClient(
    clientId: string,
    client: CreateClientDto
  ): Promise<Result<Client>> {
    const clientExists = await this.clientRepository.getClientById(clientId)

    if (!clientExists) {
      return Result.fail('Client not found')
    }

    const updatedClient = await this.clientRepository.updateClient(
      clientId,
      client
    )

    return Result.ok(updatedClient)
  }

  async getClients(): Promise<Result<Client[]>> {
    const clients = await this.clientRepository.getClients()

    return Result.ok(clients)
  }

  async getClientById(clientId: string): Promise<Result<Client>> {
    const client = await this.clientRepository.getClientById(clientId)

    if (!client) {
      return Result.fail('Client not found')
    }

    return Result.ok(client)
  }

  async getClientByEmail(email: string): Promise<Result<Client>> {
    const client = await this.clientRepository.getClientByEmail(email)

    if (!client) {
      return Result.fail('Client not found')
    }

    return Result.ok(client)
  }
}
