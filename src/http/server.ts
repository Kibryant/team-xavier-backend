import Fastify from 'fastify'

export const fastify = Fastify()

fastify.get('/ping', async (request, reply) => {
  return { pong: 'it worked!' }
})
