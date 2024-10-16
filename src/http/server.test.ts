import { describe, it, expect, beforeAll, afterAll } from 'bun:test'
import { app } from './server'
import { HTTP_STATUS_CODE } from './types/http-status-code'

let serverUrl: string

beforeAll(async () => {
  await app.listen({ port: 3001 })
  serverUrl = 'http://localhost:3001'
})

afterAll(async () => {
  await app.close()
})

describe('Fastify server tests', () => {
  it('should return 404 on unknown route', async () => {
    const response = await fetch(`${serverUrl}/unknown-route`)

    expect(response.status).toBe(404)
  })

  it('should return 401 on protected routes', async () => {
    const response = await fetch(`${serverUrl}/owner/clients`)

    expect(response.status).toBe(401)
  })
})
