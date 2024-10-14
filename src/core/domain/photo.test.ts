import { describe, it, expect } from 'bun:test'
import type { Photo } from './photo'

describe('Photo', () => {
  it('should be a entity photo', () => {
    const photo: Photo = {
      id: '1',
      url: 'https://example.com/photo.jpg',
      userId: '1',
      createdAt: new Date(),
      updatedAt: new Date(),
    }

    expect(photo).toEqual({
      id: '1',
      url: 'https://example.com/photo.jpg',
      userId: '1',
      createdAt: new Date(),
      updatedAt: new Date(),
    })
  })
})
