import type { CreatePhotoDto, Photo } from './photo'

export interface CreateUserDto {
  name: string
  email: string
  password: string
  photo?: CreatePhotoDto
  role?: Role
  plan?: Plan
}

export interface UpdateUserDto {
  name?: string
  email?: string
  password?: string
  photo?: CreatePhotoDto
  role?: Role
  plan?: Plan
}

export interface User {
  id: string
  role: Role
  plan: Plan
  name: string
  email: string
  password: string
  createdAt: Date
  updatedAt: Date
  photos: Photo[]
}

export enum Role {
  ADMIN = 'ADMIN',
  USER = 'USER',
}

export enum Plan {
  BASIC = 'BASIC',
  PRO = 'PRO',
}
