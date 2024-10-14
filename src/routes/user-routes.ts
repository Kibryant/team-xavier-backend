import type { Elysia } from 'elysia'
import { db } from '../database'
import { getUsersHandler } from '../handlers/get-users-handler'

export const userRoutes = async (app: Elysia) =>
  app.get('/users', async () => {
    const { users } = await getUsersHandler()

    return {
      users,
    }
  })
