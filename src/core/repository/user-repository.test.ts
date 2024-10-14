import { describe, it, expect, beforeAll } from 'bun:test'
import type { UserRepository } from './user-repository'
import {
  type CreateUserDto,
  Plan,
  Role,
  type UpdateUserDto,
  type User,
} from '../domain/user'

class UserRepositoryMock implements UserRepository {
  private users: User[] = []

  async getUserById(id: string): Promise<User | null> {
    const user = this.users.find(user => user.id === id)

    if (!user) {
      return null
    }

    return user
  }

  async createUser(user: CreateUserDto): Promise<User> {
    const newUser: User = {
      id: `${user.email}-${new Date().getTime()}`,
      role: Role.USER,
      plan: Plan.BASIC,
      name: user.name,
      email: user.email,
      password: user.password,
      createdAt: new Date(),
      updatedAt: new Date(),
      photos: [],
    }

    this.users.push(newUser)

    return newUser
  }

  async updateUser(id: string, user: UpdateUserDto): Promise<User> {
    const userToUpdate = this.users.find(user => user.id === id)

    if (!userToUpdate) {
      throw new Error('User not found')
    }

    if (user.photo) {
      userToUpdate.photos.push({
        id: `${id}-${new Date().getTime()}`,
        url: user.photo.url,
        userId: id,
        createdAt: new Date(),
        updatedAt: new Date(),
      })
    }

    const updatedUser = {
      ...userToUpdate,
      ...user,
      updatedAt: new Date(),
    }

    this.users = this.users.map(user => (user.id === id ? updatedUser : user))

    return updatedUser
  }

  deleteUser(id: string): Promise<void> {
    throw new Error('Method not implemented.')
  }

  async getUsers() {
    return { users: this.users }
  }
}

describe('UserRepository', () => {
  let userRepository: UserRepository

  beforeAll(() => {
    userRepository = new UserRepositoryMock()
  })

  it('should return a empty array', async () => {
    const { users } = await userRepository.getUsers()

    expect(users).toEqual([])
  })

  it('should return null', async () => {
    const user = await userRepository.getUserById('1')

    expect(user).toEqual(null)
  })

  it('should create a user', async () => {
    const user = await userRepository.createUser({
      name: 'Jane Doe',
      email: 'janedoe@gmail.com',
      password: '123456',
      role: Role.ADMIN,
    })

    expect(user).toEqual({
      id: expect.any(String),
      role: Role.USER,
      plan: Plan.BASIC,
      name: 'Jane Doe',
      email: 'janedoe@gmail.com',
      password: '123456',
      createdAt: expect.any(Date),
      updatedAt: expect.any(Date),
      photos: [],
    })
  })

  it('should update a user', async () => {
    const user = await userRepository.createUser({
      name: 'John Doe',
      email: 'johndoe@gmail.com',
      password: '123456',
      role: Role.ADMIN,
      plan: Plan.PRO,
    })

    const updatedUser = await userRepository.updateUser(user.id, {
      photo: {
        url: 'http://example.com/photo.jpg',
        userId: user.id,
      },
    })

    expect(updatedUser.photos.length).toBeGreaterThan(0)
    expect(updatedUser.photos[0]).toEqual({
      id: expect.any(String),
      url: 'http://example.com/photo.jpg',
      userId: user.id,
      createdAt: expect.any(Date),
      updatedAt: expect.any(Date),
    })
  })

  it('should return a user', async () => {
    const mocked = await userRepository.createUser({
      name: 'John Doe',
      email: 'johndoe@gmail.com',
      password: '123456',
      role: Role.ADMIN,
    })

    const user = await userRepository.getUserById(mocked.id)

    expect(user).toEqual(mocked)
    expect(user?.id).toEqual(mocked.id)
  })

  it('should return a list of users', async () => {
    const { users } = await userRepository.getUsers()

    expect(users.length).toBeGreaterThan(0)
    expect(users[0]).toBeDefined()
  })
})
