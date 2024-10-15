import { Entity } from '../shared/entity'

export class Client extends Entity {
  public name: string
  public email: string
  public password: string
  public plan: Plan

  constructor({ name, email, password, plan }: CreateClientDto, id?: string) {
    super(id)
    this.name = name
    this.email = email
    this.password = password
    this.plan = plan
  }
}

export interface CreateClientDto {
  name: string
  email: string
  password: string
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
