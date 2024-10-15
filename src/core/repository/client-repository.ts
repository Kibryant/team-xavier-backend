import type { Client, CreateClientDto, UpdateClientDto } from '../domain/client'
import type { CreatePhotoDto } from '../domain/photo'

export interface ClientRepository {
  getClients(): Promise<Client[]>
  getClientById(id: string): Promise<Client | null>
  createClient(Client: CreateClientDto): Promise<Client>
  updateClient(id: string, client: UpdateClientDto): Promise<Client>
  deleteClient(id: string): Promise<void>
}
