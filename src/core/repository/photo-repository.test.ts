import type { CreatePhotoDto, Photo } from '../domain/photo'
import { beforeEach, describe, expect, it } from 'bun:test'
import type { PhotoRepository } from './photo-repository'
import { PhotoRepositoryMock } from '../mocks/photo-repository-mock'

describe('PhotoRepositoryMock', () => {
  let photoRepository: PhotoRepositoryMock

  const mockPhotoData: CreatePhotoDto = {
    url: 'http://example.com/photo.jpg',
    clientId: 'client-123',
  }

  beforeEach(() => {
    photoRepository = new PhotoRepositoryMock()
  })

  it('should add a new photo', async () => {
    const photo = await photoRepository.addPhoto(mockPhotoData)

    expect(photo.url).toBe(mockPhotoData.url)
    expect(photo.clientId).toBe(mockPhotoData.clientId)
    expect(photo.createdAt).toBeInstanceOf(Date)
  })

  it('should delete an existing photo', async () => {
    const photo = await photoRepository.addPhoto(mockPhotoData)

    await photoRepository.deletePhoto(photo.getId())

    const remainingPhotos = await photoRepository.getPhotosByClientId(
      photo.clientId
    )
    expect(remainingPhotos.length).toBe(0)
  })

  it('should throw an error if trying to delete a non-existent photo', async () => {
    await expect(
      photoRepository.deletePhoto('non-existent-id')
    ).rejects.toThrow('Photo not found')
  })

  it('should return all photos for a client', async () => {
    await photoRepository.addPhoto(mockPhotoData)
    await photoRepository.addPhoto({
      url: 'http://example.com/photo2.jpg',
      clientId: 'client-123',
    })
    await photoRepository.addPhoto({
      url: 'http://example.com/photo3.jpg',
      clientId: 'client-456',
    })

    const clientPhotos = await photoRepository.getPhotosByClientId('client-123')

    expect(clientPhotos.length).toBe(2)
    expect(clientPhotos[0].url).toBe('http://example.com/photo.jpg')
    expect(clientPhotos[1].url).toBe('http://example.com/photo2.jpg')
  })
})
