import { Entity } from '../shared/entity'

export interface CreatePhotoDto {
  url: string
  clientId: string
  createdAt?: Date
}

export class Photo extends Entity {
  url: string
  clientId: string
  createdAt?: Date
  updatedAt?: Date

  constructor({ url, clientId, createdAt }: CreatePhotoDto, id?: string) {
    super(id)

    this.url = url
    this.clientId = clientId
    this.createdAt = createdAt || new Date()
  }
}
