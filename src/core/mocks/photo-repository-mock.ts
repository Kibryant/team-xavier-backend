import type { CreatePhotoDto, Photo } from '../domain/photo'
import type { PhotoRepository } from '../repository/photo-repository'

export class PhotoRepositoryMock implements PhotoRepository {
  private photos: Photo[] = []

  async addPhoto(photoToCreate: CreatePhotoDto): Promise<Photo> {
    const photo: Photo = {
      id: this.generateId(),
      ...photoToCreate,
      createdAt: new Date(),
      updatedAt: new Date(),
    }

    this.photos.push(photo)

    return photo
  }

  async deletePhoto(photoId: string): Promise<void> {
    const photoIndex = this.photos.findIndex(photo => photo.id === photoId)

    if (photoIndex === -1) {
      throw new Error('Photo not found')
    }

    this.photos.splice(photoIndex, 1)
  }

  private generateId(): string {
    return Math.random().toString(36).split('.')[1]
  }
}
