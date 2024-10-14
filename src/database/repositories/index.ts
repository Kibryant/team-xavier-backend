import { asc } from 'drizzle-orm'
import { db } from '..'
import { user } from '../schemas'

export async function getUsers() {
  const users = await db.query.user.findMany({
    with: {
      photos: true,
    },

    orderBy: [asc(user.createdAt)],
  })

  return {
    users,
  }
}
