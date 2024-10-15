import { type CreatePhotoDto, Photo } from '../domain/photo'
import type { PhotoRepository } from '../repository/photo-repository'

export class PhotoRepositoryMock implements PhotoRepository {
  private photos: Photo[] = []

  async addPhoto(photoToCreate: CreatePhotoDto): Promise<Photo> {
    const photo = new Photo({
      ...photoToCreate,
    })

    this.photos.push(photo)

    return photo
  }

  async deletePhoto(photoId: string): Promise<void> {
    const photoIndex = this.photos.findIndex(photo => photo.getId() === photoId)

    if (photoIndex === -1) {
      throw new Error('Photo not found')
    }

    this.photos.splice(photoIndex, 1)
  }

  async getPhotosByClientId(clientId: string): Promise<Photo[]> {
    return this.photos.filter(photo => photo.clientId === clientId)
  }
}
