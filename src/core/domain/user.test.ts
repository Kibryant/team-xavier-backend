import { describe, it, expect } from 'bun:test'
import { Plan, Role, type User } from './user'

describe('User', () => {
  it('should be a entity user', () => {
    const user: User = {
      id: '1',
      role: Role.USER,
      plan: Plan.BASIC,
      name: 'John Doe',
      email: 'johndoe@gmail.com',
      password: '123456',
      createdAt: new Date(),
      updatedAt: new Date(),
      photos: [],
    }

    expect(user).toEqual({
      id: '1',
      role: Role.USER,
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
