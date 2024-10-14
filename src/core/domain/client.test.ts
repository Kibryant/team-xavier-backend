import { describe, it, expect } from 'bun:test'
import { Plan, type Client } from './client'

describe('Client', () => {
  it('should be a entity client', () => {
    const client: Client = {
      id: '1',
      plan: Plan.BASIC,
      name: 'John Doe',
      email: 'johndoe@gmail.com',
      password: '123456',
      createdAt: new Date(),
      updatedAt: new Date(),
      photos: [],
    }

    expect(client).toEqual({
      id: '1',
      plan: Plan.BASIC,
      name: 'John Doe',
      email: 'johndoe@gmail.com',
      password: '123456',
      createdAt: new Date(),
      updatedAt: new Date(),
      photos: [],
    })
  })
})
