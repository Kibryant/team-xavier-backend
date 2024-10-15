import { describe, it, expect } from 'bun:test'
import { Entity } from './entity'

class TestEntity extends Entity {}

describe('Entity', () => {
  it('should be a entity with my own id', () => {
    const entity = new TestEntity('my-own-id')

    expect(entity).toHaveProperty('id')
    expect(entity.getId()).toBe('my-own-id')
  })

  it('should be a entity with generated id', () => {
    const entity = new TestEntity()

    expect(entity).toHaveProperty('id')
    expect(entity.getId()).not.toBeNull()
  })

  it('should be equals', () => {
    const entity1 = new TestEntity('1')
    const entity2 = new TestEntity('1')

    expect(entity1.equals(entity2)).toBe(true)
  })

  it('should not be equals', () => {
    const entity1 = new TestEntity('1')
    const entity2 = new TestEntity('2')

    expect(entity1.equals(entity2)).toBe(false)
  })
})
