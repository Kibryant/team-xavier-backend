import { Entity } from '../shared/entity'

export interface ClientPersistance {
  id: string
  name: string
  email: string
  password: string
  plan: Plan
  createdAt: Date
  updatedAt: Date
}

export class Client extends Entity {
  public name: string
  public email: string
  public password: string
  public plan: Plan
  public createdAt: Date
  public updatedAt: Date

  constructor(
    { name, email, password, plan, createdAt, updatedAt }: CreateClientDto,
    id?: string
  ) {
    super(id)
    this.name = name
    this.email = email
    this.password = password
    this.plan = plan
    this.createdAt = createdAt || new Date()
    this.updatedAt = updatedAt || new Date()
  }
}

export interface CreateClientDto {
  name: string
  email: string
  password: string
  plan: Plan
  createdAt?: Date
  updatedAt?: Date
}

export interface UpdateClientDto {
  name?: string
  email?: string
}

export type Plan = (typeof Plan)[keyof typeof Plan]

const Plan = {
  BASIC: 'BASIC',
  PRO: 'PRO',
  FREE: 'FREE',
} as const
