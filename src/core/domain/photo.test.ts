import { describe, it, expect } from 'bun:test'
import { Photo } from './photo'

describe('Photo', () => {
  it('should be a entity photo with my own id', () => {
    const photo = new Photo(
      {
        url: 'http://example.com/photo.jpg',
        clientId: '1',
      },
      'my-own-id'
    )

    expect(photo).toHaveProperty('id')
    expect(photo.getId()).toBe('my-own-id')
    expect(photo.url).toBe('http://example.com/photo.jpg')
    expect(photo.clientId).toBe('1')
    expect(photo.createdAt).toBeInstanceOf(Date)
  })

  it('should be a entity photo with generated id', () => {
    const photo = new Photo({
      url: 'http://example.com/photo.jpg',
      clientId: '1',
    })

    expect(photo).toHaveProperty('id')
    expect(photo.getId()).not.toBeNull()
    expect(photo.url).toBe('http://example.com/photo.jpg')
    expect(photo.clientId).toBe('1')
    expect(photo.createdAt).toBeInstanceOf(Date)
  })
})
