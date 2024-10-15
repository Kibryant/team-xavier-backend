import { describe, it, expect, beforeAll, afterAll } from 'bun:test'
import { fastify } from './server'

let serverUrl: string

beforeAll(async () => {
  await fastify.listen({ port: 3000 })
  serverUrl = 'http://localhost:3000'
})

afterAll(async () => {
  await fastify.close()
})

describe('Fastify server tests', () => {
  it('should return pong on /ping', async () => {
    const response = await fetch(`${serverUrl}/ping`)
    const json = await response.json()

    expect(response.status).toBe(200)
    expect(json).toEqual({ pong: 'it worked!' })
  })
})
