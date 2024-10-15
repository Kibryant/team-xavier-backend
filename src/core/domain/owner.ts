import { Entity } from '../shared/entity'

interface CreateOwnerDto {
  name: string
  email: string
  password: string
  createdAt?: Date
}

export class Owner extends Entity {
  private name: string
  private email: string
  private password: string
  private createdAt: Date
  private updatedAt: Date

  constructor(
    { name, email, password, createdAt }: CreateOwnerDto,
    id?: string
  ) {
    super(id)
    this.name = name
    this.email = email
    this.password = password
    this.createdAt = createdAt ?? new Date()
    this.updatedAt = new Date()
  }

  public getName(): string {
    return this.name
  }

  public getEmail(): string {
    return this.email
  }

  public getPassword(): string {
    return this.password
  }

  public getCreatedAt(): Date {
    return this.createdAt
  }

  public getUpdatedAt(): Date {
    return this.updatedAt
  }
}
