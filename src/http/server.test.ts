import { describe, it, expect, beforeAll, afterAll } from 'bun:test'
import { app } from './server'
import { HTTP_STATUS_CODE } from './types/http-status-code'

let serverUrl: string

beforeAll(async () => {
  await app.listen({ port: 3000 })
  serverUrl = 'http://localhost:3000'
})

afterAll(async () => {
  await app.close()
})

describe('Fastify server tests', () => {
  it('should return 404 on unknown route', async () => {
    const response = await fetch(`${serverUrl}/unknown-route`)

    expect(response.status).toBe(404)
  })

  it('should return a array clients on /clients', async () => {
    const response = await fetch(`${serverUrl}/clients`)
    const json = await response.json()

    expect(response.status).toBe(HTTP_STATUS_CODE.OK)
    expect(json.data.length).toBeGreaterThan(0)
  })

  it('should return 400 on /create-client with invalid data', async () => {
    const response = await fetch(`${serverUrl}/create-client`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: 'John Doe',
        email: 'invalid-email',
        password: '123456',
        plan: 'BASIC',
      }),
    })

    const json = await response.json()

    expect(response.status).toBe(HTTP_STATUS_CODE.BAD_REQUEST)
    expect(json.error).toBe('Bad Request')
    expect(json.message).toBe('Invalid data')
  })

  it('should create a client on /create-client', async () => {
    const response = await fetch(`${serverUrl}/create-client`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: 'Jane Doe',
        email: 'janedoe@gmail.com',
        password: '123456',
        plan: 'BASIC',
      }),
    })

    const json = await response.json()

    expect(response.status).toBe(HTTP_STATUS_CODE.CREATED)
    expect(json.data).toHaveProperty('id')
    expect(json.data.name).toBe('Jane Doe')
    expect(json.data.email).toBe('janedoe@gmail.com')
    expect(json.data.plan).toBe('BASIC')
  })
})
