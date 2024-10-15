import { describe, it, expect, beforeEach } from 'bun:test'
import type { CreateClientDto, UpdateClientDto } from '../domain/client'
import type { ClientRepository } from './client-repository'
import { ClientRepositoryMock } from '../mocks/client-repository-mock'

describe('ClientRepository', () => {
  let clientRepository: ClientRepository

  beforeEach(() => {
    clientRepository = new ClientRepositoryMock()
  })

  it('should create a new client with plan basic', async () => {
    const createClientDto: CreateClientDto = {
      name: 'John Doe',
      email: 'john@example.com',
      password: 'securepassword',
      plan: 'BASIC',
    }

    const newClient = await clientRepository.createClient(createClientDto)

    expect(newClient).toHaveProperty('id')
    expect(newClient.name).toBe('John Doe')
    expect(newClient.email).toBe('john@example.com')
    expect(newClient.plan).toBe('BASIC')
  })

  it('should create a new client with plan pro', async () => {
    const createClientDto: CreateClientDto = {
      name: 'John Doe',
      email: 'johndoe@gmail.com',
      password: 'securepassword',
      plan: 'PRO',
    }

    const newClient = await clientRepository.createClient(createClientDto)

    expect(newClient).toHaveProperty('id')
    expect(newClient.name).toBe('John Doe')
    expect(newClient.email).toBe('johndoe@gmail.com')
    expect(newClient.plan).toBe('PRO')
  })

  it('should update a client', async () => {
    const createClientDto: CreateClientDto = {
      name: 'John Doe',
      email: 'johndoe@gmail.com',
      password: 'securepassword',
      plan: 'BASIC',
    }

    const newClient = await clientRepository.createClient(createClientDto)

    const updateClientDto: UpdateClientDto = {
      email: 'janedoe@gmail.com',
      name: 'Jane Doe',
    }

    const updatedClient = await clientRepository.updateClient(
      newClient.id,
      updateClientDto
    )

    expect(updatedClient).toHaveProperty('id')
    expect(updatedClient.name).toBe('Jane Doe')
    expect(updatedClient.email).toBe('janedoe@gmail.com')
    expect(updatedClient.plan).toBe('BASIC')
  })

  it('should get all clients', async () => {
    const createClientDto: CreateClientDto = {
      name: 'John Doe',
      email: 'john@example.com',
      password: 'securepassword',
      plan: 'BASIC',
    }

    await clientRepository.createClient(createClientDto)

    const clients = await clientRepository.getClients()

    expect(clients.length).toBe(1)
    expect(clients[0].name).toBe('John Doe')
  })

  it('should get clients paginated', async () => {
    const createClientDto: CreateClientDto = {
      name: 'John Doe',
      email: 'john@example.com',
      password: 'securepassword',
      plan: 'BASIC',
    }

    await clientRepository.createClient(createClientDto)
    await clientRepository.createClient(createClientDto)
    await clientRepository.createClient(createClientDto)
    await clientRepository.createClient(createClientDto)

    const clients = await clientRepository.getClientsPaginated(1, 2)

    expect(clients.length).toBe(2)
  })

  it('should get a client by ID', async () => {
    const createClientDto: CreateClientDto = {
      name: 'John Doe',
      email: 'john@example.com',
      password: 'securepassword',
      plan: 'BASIC',
    }

    const newClient = await clientRepository.createClient(createClientDto)

    const foundClient = await clientRepository.getClientById(newClient.id)

    expect(foundClient).not.toBeNull()
    expect(foundClient?.name).toBe('John Doe')
    expect(foundClient?.email).toBe('john@example.com')
  })

  it('should get a client by email', async () => {
    const createClientDto: CreateClientDto = {
      name: 'John Doe',
      email: 'johndoe@gmail.com',
      password: 'securepassword',
      plan: 'BASIC',
    }

    await clientRepository.createClient(createClientDto)

    const foundClient = await clientRepository.getClientByEmail(
      createClientDto.email
    )

    expect(foundClient).not.toBeNull()
    expect(foundClient?.name).toBe('John Doe')
  })

  it('should return null when getting a non-existent client by email', async () => {
    const foundClient = await clientRepository.getClientByEmail('fake-email')

    expect(foundClient).toBeNull()
  })

  it('should delete a client', async () => {
    const createClientDto: CreateClientDto = {
      name: 'John Doe',
      email: 'john@example.com',
      password: 'securepassword',
      plan: 'BASIC',
    }

    const newClient = await clientRepository.createClient(createClientDto)

    await clientRepository.deleteClient(newClient.id)

    const foundClient = await clientRepository.getClientById(newClient.id)

    expect(foundClient).toBeNull()
  })

  it('should return null when getting a non-existent client', async () => {
    const foundClient = await clientRepository.getClientById('non-existent-id')

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
