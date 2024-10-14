import { describe, it, expect } from 'bun:test'
import type { Owner } from './owner'

describe('Owner', () => {
  it('should be a entity owner', () => {
    const owner: Owner = {
      id: '1',
      name: 'John Doe',
      email: 'owner@gmail.com',
      password: '123456',
      createdAt: new Date(),
      updatedAt: new Date(),
    }

    expect(owner).toEqual({
      id: '1',
      name: 'John Doe',
      email: 'owner@gmail.com',
      password: '123456',
      createdAt: new Date(),
      updatedAt: new Date(),
    })
  })
})
