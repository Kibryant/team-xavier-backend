import { Entity } from '../shared/entity'
import type { CreatePhotoDto, Photo } from './photo'

export class Client extends Entity {
  public name: string
  public email: string
  public password: string
  public plan: Plan
  public photos: Photo[]

  constructor(
    { name, email, password, plan, photos }: CreateClientDto,
    id?: string
  ) {
    super(id)
    this.name = name
    this.email = email
    this.password = password
    this.plan = plan
    this.photos = photos ?? []
  }
}

export interface CreateClientDto {
  name: string
  email: string
  password: string
  photos?: Photo[]
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
