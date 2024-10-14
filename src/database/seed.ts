import { db, client } from '.'
import { photo, user } from './schemas'

async function seed() {
  await db.delete(user)
  await db.delete(photo)

  const [user1, user2] = await db
    .insert(user)
    .values([
      { name: 'Alice', email: 'alice@gmail.com', password: '123' },
      { name: 'Bob', email: 'bob@gmail.com', password: '123' },
    ])
    .returning()
}

seed().then(() => {
  console.log('🌱 Database seeded successfully!')
  client.end()
})
