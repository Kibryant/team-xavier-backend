import { createId } from '@paralleldrive/cuid2'
import { relations } from 'drizzle-orm'
import { pgEnum, pgTable, text, timestamp } from 'drizzle-orm/pg-core'

export const plan = pgEnum('plan', ['BASIC', 'PRO'])
export const role = pgEnum('role', ['USER', 'ADMIN'])

export const user = pgTable('user', {
  id: text('id')
    .primaryKey()
    .$defaultFn(() => createId()),
  role: role('role').notNull().default('USER'),
  name: text('name').notNull(),
  email: text('email').unique().notNull(),
  password: text('password').notNull(),
  plan: plan('plan').notNull().default('BASIC'),
  createdAt: timestamp('created_at', { withTimezone: true })
    .notNull()
    .defaultNow(),
})

export const userRelations = relations(user, ({ many }) => ({
  photos: many(photo),
}))

export const photo = pgTable('photo', {
  id: text('id')
    .primaryKey()
    .$defaultFn(() => createId()),
  uploadedAt: timestamp('uploaded_at', { withTimezone: true })
    .notNull()
    .defaultNow(),
  userId: text('user_id').notNull(),
})

export const photoRelations = relations(photo, ({ one }) => ({
  user: one(user, {
    fields: [photo.userId],
    references: [user.id],
  }),
}))
