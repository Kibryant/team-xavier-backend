import type { CreatePhotoDto, Photo } from '../domain/photo'

export interface PhotoRepository {
  addPhoto(photo: CreatePhotoDto): Promise<Photo>
  deletePhoto(photoId: string): Promise<void>
  getPhotosByClientId(clientId: string): Promise<Photo[]>
}
