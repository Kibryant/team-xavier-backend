import { describe, it, expect } from 'bun:test'
import { Owner } from './owner'

describe('Owner', () => {
  it('should be a entity owner with my own id', () => {
    const owner = new Owner(
      {
        name: 'John Doe',
        email: 'johndoe@gmail.com',
        password: '123456',
      },
      '1'
    )

    expect(owner).toBeDefined()
    expect(owner.getId()).toBe('1')
    expect(owner.getName()).toBe('John Doe')
    expect(owner.getEmail()).toBe('johndoe@gmail.com')
    expect(owner.getPassword()).toBe('123456')
    expect(owner.getCreatedAt()).toBeDefined()
    expect(owner.getUpdatedAt()).toBeDefined()
  })

  it('should be a entity owner with a generated id', () => {
    const owner = new Owner({
      name: 'John Doe',
      email: 'johndoe@gmail.com',
      password: '123456',
    })

    expect(owner).toBeDefined()
    expect(owner.getId()).toBeDefined()
    expect(owner.getName()).toBe('John Doe')
    expect(owner.getEmail()).toBe('johndoe@gmail.com')
    expect(owner.getPassword()).toBe('123456')
    expect(owner.getCreatedAt()).toBeDefined()
    expect(owner.getUpdatedAt()).toBeDefined()
  })
})
