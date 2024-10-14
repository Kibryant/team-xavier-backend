import type { CreatePhotoDto, Photo } from './photo'

export interface Client {
  id: string
  plan: Plan
  name: string
  email: string
  password: string
  createdAt: Date
  updatedAt: Date
  photos: Photo[]
}

export interface CreateClientDto {
  name: string
  email: string
  password: string
  photo?: CreatePhotoDto
  plan: Plan
}

export interface UpdateClientDto {
  name?: string
  email?: string
  password?: string
  plan?: Plan
}

export enum Plan {
  BASIC = 'BASIC',
  PRO = 'PRO',
}
