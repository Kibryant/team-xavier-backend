import { createId } from '@paralleldrive/cuid2'

export abstract class Entity {
  protected id: string

  constructor(id?: string) {
    this.id = id ?? createId()
  }

  public equals(entity: Entity): boolean {
    return entity.id === this.id
  }

  public getId(): string {
    return this.id
  }
}
