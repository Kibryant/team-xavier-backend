import { Elysia, t } from 'elysia'
import { db } from './database'
import { user } from './database/schemas'
import swagger from '@elysiajs/swagger'
import { userRoutes } from './routes/user-routes'

const app = new Elysia({ prefix: '/api/v0' })
  .use(swagger())
  .use(userRoutes)
  // .group('/user', app =>
  //   app
  //     .post(
  //       '/create',
  //       async ctx => {
  //         const { name, email, password, plan } = ctx.body

  //         console.log('Creating user:', name, email, password, plan)

  //         const [newUser] = await db
  //           .insert(user)
  //           .values({ name, email, password, plan })
  //           .returning()

  //         return newUser
  //       },
  //       {
  //         body: t.Object({
  //           name: t.String(),
  //           email: t.String(),
  //           password: t.String(),
  //           plan: t.Optional(
  //             t.Enum({
  //               BASIC: 'BASIC',
  //               PRO: 'PRO',
  //             })
  //           ),
  //         }),
  //       }
  //     )
  //     .get('/', async () => {
  //       const users = await db.query.user.findMany({
  //         with: {
  //           photos: true,
  //         },
  //       })

  //       return {
  //         message: 'Hello, world!',
  //         users,
  //       }
  //     })
  // )
  .listen(3333)

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
)
