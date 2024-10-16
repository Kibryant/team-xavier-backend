import type {
  ClientPersistance,
  CreateClientDto,
  Plan,
  UpdateClientDto,
} from '../domain/client'

export interface ClientRepository {
  getClients(): Promise<ClientPersistance[]>
  getClientById(id: string): Promise<ClientPersistance | null>
  getClientByEmail(email: string): Promise<ClientPersistance | null>
  createClient(client: CreateClientDto): Promise<ClientPersistance>
  updateClient(id: string, client: UpdateClientDto): Promise<ClientPersistance>
  changeClientPlan(id: string, plan: Plan): Promise<ClientPersistance>
  deleteClient(id: string): Promise<void>
  getClientsPaginated(page: number, limit: number): Promise<ClientPersistance[]>
}
