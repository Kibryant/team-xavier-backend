import type { User, CreateUserDto, UpdateUserDto } from '../domain/user'

export interface UserRepository {
  getUsers(): Promise<{ users: User[] }>
  getUserById(id: string): Promise<User | null>
  createUser(user: CreateUserDto): Promise<User>
  updateUser(id: string, user: UpdateUserDto): Promise<User>
  deleteUser(id: string): Promise<void>
}
