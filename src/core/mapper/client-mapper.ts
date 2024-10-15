import { Client, type ClientPersistance } from '../domain/client'

// biome-ignore lint/complexity/noStaticOnlyClass: <explanation>
export class ClientMapper {
  static toDomain(client: ClientPersistance, id?: string): Client {
    return new Client(client, id)
  }

  static toPersistence(client: Client): ClientPersistance {
    return {
      id: client.getId(),
      name: client.name,
      email: client.email,
      password: client.password,
      plan: client.plan,
      createdAt: client.createdAt,
      updatedAt: client.updatedAt,
    }
  }
}
