import { describe, it, expect, beforeEach } from 'bun:test'
import { ClientService } from './client-service'
import type { ClientRepository } from '../repository/client-repository'
import { ClientRepositoryMock } from '../mocks/client-repository-mock'
import type {
  CreateClientDto,
  ClientPersistance,
  UpdateClientDto,
} from '../domain/client'

describe('ClientService', () => {
  let clientService: ClientService
  let clientRepository: ClientRepository

  beforeEach(() => {
    clientRepository = new ClientRepositoryMock()
    clientService = new ClientService(clientRepository)
  })

  describe('createClient', () => {
    it('should create a client when the client does not already exist', async () => {
      const newClient: CreateClientDto = {
        email: 'test@test.com',
        name: 'Test',
        plan: 'BASIC',
        password: '123456',
      }

      const result = await clientService.createClient(newClient)

      expect(result.isSuccess).toBe(true)
      expect(result.value).toBeDefined()
      expect(result.statusCode).toBe(201)
      expect(result.value.email).toBe(newClient.email)
      expect(result.value.name).toBe(newClient.name)
    })

    it('should return a failure result when the client already exists', async () => {
      await clientRepository.createClient({
        email: 'johndoe@gmail.com',
        name: 'John Doe',
        plan: 'BASIC',
        password: 'securepassword',
      })

      const newClient: CreateClientDto = {
        email: 'johndoe@gmail.com',
        name: 'John Doe',
        plan: 'BASIC',
        password: 'securepassword',
      }

      const result = await clientService.createClient(newClient)

      expect(result.isSuccess).toBe(false)
      expect(result.error).toBe('Client already exists')
      expect(result.statusCode).toBe(409)
    })
  })

  describe('deleteClient', () => {
    it('should delete a client when the client exists', async () => {
      const { value: client } = await clientService.createClient({
        email: 'johndoe@gmail.com',
        name: 'John Doe',
        plan: 'BASIC',
        password: 'securepassword',
      })

      const clientId = client.id

      const result = await clientService.deleteClient(clientId)

      expect(result.isSuccess).toBe(true)
      expect(result.statusCode).toBe(200)
    })

    it('should return a failure result when the client does not exist', async () => {
      const clientId = '1'

      const result = await clientService.deleteClient(clientId)

      expect(result.isSuccess).toBe(false)
      expect(result.error).toBe('Client not found')
      expect(result.statusCode).toBe(404)
    })
  })

  describe('updateClient', () => {
    it('should update a client when the client exists', async () => {
      const { value: client } = await clientService.createClient({
        email: 'johndoe@gmail.com',
        name: 'John Doe',
        plan: 'BASIC',
        password: 'securepassword',
      })

      const clientId = client.id

      const updateData: UpdateClientDto = {
        email: 'janedoe@gmail.com',
      }

      const result = await clientService.updateClient(clientId, updateData)

      const updatedClient = result.value

      expect(result.isSuccess).toBe(true)
      expect(result.value).toEqual(updatedClient)
      expect(result.statusCode).toBe(200)
      expect(updatedClient.email).toBe('janedoe@gmail.com')
      expect(updatedClient.name).toBe(client.name)
      expect(updatedClient.plan).toBe(client.plan)
    })

    it('should return a failure result when the client does not exist', async () => {
      const clientId = '1'

      const updateData: UpdateClientDto = {
        email: 'fake',
      }

      const result = await clientService.updateClient(clientId, updateData)

      expect(result.isSuccess).toBe(false)
      expect(result.error).toBe('Client not found')
      expect(result.statusCode).toBe(404)
    })
  })

  describe('getClients', async () => {
    it('should return a list of clients', async () => {
      const result = await clientService.getClients()

      expect(result.isSuccess).toBe(true)
      expect(result.value).toEqual([])
      expect(result.statusCode).toBe(200)
    })
  })

  describe('getClientById', () => {
    it('should return a client by ID', async () => {
      const newClient: CreateClientDto = {
        email: 'test@test.com',
        name: 'Test',
        plan: 'BASIC',
        password: '123456',
      }

      const { value: client } = await clientService.createClient(newClient)

      const clientId = client.id

      const result = await clientService.getClientById(clientId)

      expect(result.isSuccess).toBe(true)
      expect(result.value).toEqual(client)
      expect(result.statusCode).toBe(200)
    })

    it('should return a failure result when the client is not found', async () => {
      const clientId = '1'

      const result = await clientService.getClientById(clientId)

      expect(result.isSuccess).toBe(false)
      expect(result.error).toBe('Client not found')
      expect(result.statusCode).toBe(404)
    })
  })

  describe('getClientByEmail', () => {
    it('should return a client by email', async () => {
      const newClient: CreateClientDto = {
        email: 'test@test.com',
        name: 'Test',
        plan: 'BASIC',
        password: '123456',
      }

      const { value: client } = await clientService.createClient(newClient)

      const result = await clientService.getClientByEmail(client.email)

      expect(result.isSuccess).toBe(true)
      expect(result.value).toEqual(client)
      expect(result.statusCode).toBe(200)
    })

    it('should return a failure result when the client is not found', async () => {
      const email = 'test@test.com'

      const result = await clientService.getClientByEmail(email)

      expect(result.isSuccess).toBe(false)
      expect(result.error).toBe('Client not found')
      expect(result.statusCode).toBe(404)
    })
  })
})
