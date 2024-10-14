import { describe, it, expect, beforeEach } from 'bun:test'
import {
  Plan,
  type CreateClientDto,
  type UpdateClientDto,
} from '../domain/client'
import type { ClientRepository } from './client-repository'
import { ClientRepositoryMock } from '../mocks/client-repository-mock'

describe('ClientRepository', () => {
  let clientRepository: ClientRepository

  beforeEach(() => {
    clientRepository = new ClientRepositoryMock()
  })

  it('should create a new client without a photo', async () => {
    const createClientDto: CreateClientDto = {
      name: 'John Doe',
      email: 'john@example.com',
      password: 'securepassword',
      plan: Plan.BASIC,
    }

    const newClient = await clientRepository.createClient(createClientDto)

    expect(newClient).toHaveProperty('id')
    expect(newClient.name).toBe('John Doe')
    expect(newClient.email).toBe('john@example.com')
    expect(newClient.plan).toBe(Plan.BASIC)
    expect(newClient.photos.length).toBe(0)
  })

  it('should get all clients', async () => {
    const createClientDto: CreateClientDto = {
      name: 'John Doe',
      email: 'john@example.com',
      password: 'securepassword',
      plan: Plan.BASIC,
    }

    await clientRepository.createClient(createClientDto)

    const result = await clientRepository.getClients()

    expect(result.clients.length).toBe(1)
    expect(result.clients[0].name).toBe('John Doe')
  })

  it('should get a client by ID', async () => {
    const createClientDto: CreateClientDto = {
      name: 'John Doe',
      email: 'john@example.com',
      password: 'securepassword',
      plan: Plan.BASIC,
    }

    const newClient = await clientRepository.createClient(createClientDto)

    const foundClient = await clientRepository.getClientById(newClient.id)

    expect(foundClient).not.toBeNull()
    expect(foundClient?.name).toBe('John Doe')
  })

  it('should delete a client', async () => {
    const createClientDto: CreateClientDto = {
      name: 'John Doe',
      email: 'john@example.com',
      password: 'securepassword',
      plan: Plan.BASIC,
    }

    const newClient = await clientRepository.createClient(createClientDto)

    await clientRepository.deleteClient(newClient.id)

    const foundClient = await clientRepository.getClientById(newClient.id)

    expect(foundClient).toBeNull()
  })

  it('should throw an error when updating a non-existent client', async () => {
    const updateClientDto: UpdateClientDto = {
      email: 'nonexistent@example.com',
    }

    await expect(
      clientRepository.updateClient('non-existent-id', updateClientDto)
    ).rejects.toThrow('Client not found')
  })

  it('should throw an error when deleting a non-existent client', async () => {
    await expect(
      clientRepository.deleteClient('non-existent-id')
    ).rejects.toThrow('Client not found')
  })
})
