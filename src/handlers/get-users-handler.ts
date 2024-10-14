import { getUsers } from '../database/repositories'

export async function getUsersHandler() {
  const { users } = await getUsers()

  return {
    users,
  }
}
