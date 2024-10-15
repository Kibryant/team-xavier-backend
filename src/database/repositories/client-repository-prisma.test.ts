// import { describe, expect, it, mock } from 'bun:test'
// import { ClientRepositoryPrisma } from './client-repository-prisma'
// import type { ClientRepository } from '../../core/repository/client-repository'
// import type { CreateClientDto } from '../../core/domain/client'

// describe('ClientRepositoryPrisma', () => {
//   let clientRepository: ClientRepository

//   it('should create a new client with plan basic', async () => {
//     const createClientDto: CreateClientDto = {
//       name: 'John Doe',
//       email: 'johndoe@gmail.com',
//       password: 'securepassword',
//       plan: 'BASIC',
//     }

//     clientRepository = new ClientRepositoryPrisma()

//     const createClientMock = mock
//       .spyOn(clientRepository, 'createClient')
//       .mockResolvedValue({
//         id: '123',
//         name: 'John Doe',
//         email: 'johndoe@gmail.com',
//         password: 'securepassword',
//         plan: 'BASIC',
//         createdAt: new Date(),
//         updatedAt: new Date(),
//       })

//     const newClient = await clientRepository.createClient(createClientDto)

//     expect(createClientMock).toHaveBeenCalledWith(createClientDto)
//     expect(newClient).toHaveProperty('id')
//     expect(newClient.name).toBe('John Doe')
//     expect(newClient.email).toBe('johndoe@gmail.com')
//     expect(newClient.plan).toBe('BASIC')
//   })

//   it('should mock the getClientByEmail method', async () => {
//     clientRepository = new ClientRepositoryPrisma()

//     const getClientByEmailMock = mock
//       .spyOn(clientRepository, 'getClientByEmail')
//       .mockResolvedValue({
//         id: '123',
//         name: 'John Doe',
//         email: 'john@example.com',
//         password: 'hashedPassword',
//         plan: 'BASIC',
//         createdAt: new Date(),
//         updatedAt: new Date(),
//       })

//     const result = await clientRepository.getClientByEmail('john@example.com')

//     expect(getClientByEmailMock).toHaveBeenCalledWith('john@example.com')
//     expect(result).toEqual({
//       id: '123',
//       name: 'John Doe',
//       email: 'john@example.com',
//       password: 'hashedPassword',
//       plan: 'BASIC',
//       createdAt: expect.any(Date),
//       updatedAt: expect.any(Date),
//     })
//   })
// })
