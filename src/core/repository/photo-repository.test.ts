import type { CreatePhotoDto, Photo } from '../domain/photo'
import { beforeEach, describe, expect, it } from 'bun:test'
import type { PhotoRepository } from './photo-repository'
import { PhotoRepositoryMock } from '../mocks/photo-repository-mock'

describe('PhotoRepositoryMock', () => {
  let photoRepository: PhotoRepository

  beforeEach(() => {
    photoRepository = new PhotoRepositoryMock()
  })

  it('should add a new photo', async () => {
    const userId = 'user123'

    const createPhotoDto: CreatePhotoDto = {
      url: 'https://example.com/photo1.jpg',
      userId,
    }

    const newPhoto = await photoRepository.addPhoto(createPhotoDto)

    expect(newPhoto).toHaveProperty('id')
    expect(newPhoto.url).toBe(createPhotoDto.url)
    expect(newPhoto.createdAt).toBeInstanceOf(Date)
    expect(newPhoto.updatedAt).toBeInstanceOf(Date)
  })

  it('should delete a photo by id', async () => {
    const userId = 'user456'

    const createPhotoDto: CreatePhotoDto = {
      url: 'https://example.com/photo2.jpg',
      userId,
    }

    const photo = await photoRepository.addPhoto(createPhotoDto)

    await photoRepository.deletePhoto(photo.id)

    // @ts-ignore
    // biome-ignore lint/complexity/useLiteralKeys: <explanation>
    const photos = photoRepository['photos'] // Access the private array for test purposes
    const foundPhoto = photos.find((p: { id: string }) => p.id === photo.id)

    expect(foundPhoto).toBeUndefined()
  })

  it('should not throw an error if deleting a non-existent photo', async () => {
    await expect(
      photoRepository.deletePhoto('non-existent-photo-id')
    ).rejects.toThrow('Photo not found')
  })
})
