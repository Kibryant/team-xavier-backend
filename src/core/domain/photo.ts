export interface CreatePhotoDto {
  url: string
  userId: string
}

export interface Photo {
  id: string
  url: string
  userId: string
  createdAt: Date
  updatedAt: Date
}
