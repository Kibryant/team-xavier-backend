import { prisma } from './__mocks__/prisma'
import { ClientRepositoryPrisma } from '../src/database/repositories/client-repository-prisma'
import { expect, it, describe } from 'vitest'
import type { ClientPersistance } from '../src/core/domain/client'

const clientRepository = new ClientRepositoryPrisma(prisma)

describe('ClientRepositoryPrisma', () => {
  it('should create a client', async () => {
    const mockResult: ClientPersistance = {
      id: 'RANDOM_CUID',
      name: 'John Doe',
      email: 'johndoe@gmail.com',
      password: '123456',
      plan: 'BASIC',
      createdAt: new Date(),
      updatedAt: new Date(),
    }

    prisma.client.create.mockResolvedValue(mockResult)

    const client = await clientRepository.createClient({
      name: 'John Doe',
      email: 'johndoe@gmail.com',
      password: '123456',
      plan: 'BASIC',
    })

    expect(client).toMatchObject({
      id: expect.any(String),
      name: 'John Doe',
      email: 'johndoe@gmail.com',
      password: '123456',
      plan: 'BASIC',
      createdAt: expect.any(Date),
      updatedAt: expect.any(Date),
    })
  })
})
