import { describe, it, expect } from 'bun:test'
import { Client } from './client'

describe('Client', () => {
  it('should be a entity client with my own id', () => {
    const client = new Client(
      {
        name: 'John Doe',
        email: 'johndoe@gmail.com',
        password: 'securepassword',
        plan: 'BASIC',
      },
      'my-own-id'
    )

    expect(client).toHaveProperty('id')
    expect(client.getId()).toBe('my-own-id')
    expect(client.name).toBe('John Doe')
    expect(client.email).toBe('johndoe@gmail.com')
    expect(client.plan).toBe('BASIC')
  })

  it('should be a entity client with generated id', () => {
    const client = new Client({
      name: 'John Doe',
      email: 'johndoe@gmail.com',
      password: 'securepassword',
      plan: 'BASIC',
    })

    expect(client).toHaveProperty('id')
    expect(client.getId()).not.toBeNull()
    expect(client.name).toBe('John Doe')
    expect(client.email).toBe('johndoe@gmail.com')
    expect(client.plan).toBe('BASIC')
  })
})
