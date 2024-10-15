import { ClientMapper } from './client-mapper'
import { Client, type ClientPersistance } from '../domain/client'
import { describe, it, expect } from 'bun:test'

const mockClientPersistence = {
  id: 'my-own-id',
  name: 'John Doe',
  email: 'john.doe@example.com',
  password: 'securepassword',
  plan: 'BASIC',
  createdAt: new Date(),
  updatedAt: new Date(),
} as ClientPersistance

const mockClient = new Client(mockClientPersistence, mockClientPersistence.id)

describe('ClientMapper', () => {
  describe('toDomain', () => {
    it('should convert ClientPersistence to Client domain object', () => {
      const clientDomain = ClientMapper.toDomain(
        mockClientPersistence,
        mockClientPersistence.id
      )

      expect(clientDomain).toBeInstanceOf(Client)
      expect(clientDomain.getId()).toBe(mockClientPersistence.id)
      expect(clientDomain.name).toBe(mockClientPersistence.name)
      expect(clientDomain.email).toBe(mockClientPersistence.email)
      expect(clientDomain.plan).toBe(mockClientPersistence.plan)
      expect(clientDomain.createdAt).toBe(mockClientPersistence.createdAt)
      expect(clientDomain.updatedAt).toBe(mockClientPersistence.updatedAt)
    })
  })

  describe('toPersistence', () => {
    it('should convert Client domain object to ClientPersistence', () => {
      const clientPersistence = ClientMapper.toPersistence(mockClient)

      expect(clientPersistence.id).toBe(mockClient.getId())
      expect(clientPersistence.name).toBe(mockClient.name)
      expect(clientPersistence.email).toBe(mockClient.email)
      expect(clientPersistence.password).toBe(mockClient.password)
      expect(clientPersistence.plan).toBe(mockClient.plan)
      expect(clientPersistence.createdAt).toBe(mockClient.createdAt)
      expect(clientPersistence.updatedAt).toBe(mockClient.updatedAt)
    })
  })
})
