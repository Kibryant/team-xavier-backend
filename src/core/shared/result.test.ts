import { describe, it, expect } from 'bun:test'
import { Result } from './result'

describe('Result', () => {
  it('should create a successful result with a value', () => {
    const result = Result.ok(200, 'Success value')

    expect(result.isSuccess).toBe(true)
    expect(result.isFailure).toBe(false)
    expect(result.value).toBe('Success value')
    expect(() => result.getErrorValue()).toThrow(
      'Cant retrieve the error message from a successful result.'
    )
  })

  it('should create a successful result with undefined value', () => {
    const result = Result.ok(200)

    expect(result.isSuccess).toBe(true)
    expect(result.isFailure).toBe(false)
    expect(result.value).toBeUndefined()
    expect(() => result.getErrorValue()).toThrow(
      'Cant retrieve the error message from a successful result.'
    )
  })

  it('should create a failed result with an error message', () => {
    const result = Result.fail<string>('Failure message', 400)

    expect(result.isSuccess).toBe(false)
    expect(result.isFailure).toBe(true)
    expect(result.getErrorValue()).toBe('Failure message')
    expect(result.statusCode).toBe(400)
    expect(() => result.value).toThrow(
      'Cant retrieve the value from a failed result.'
    )
  })

  it('should throw error if success is created with an error', () => {
    expect(() => {
      Result.ok<string>(200, 'Success value').getErrorValue()
    }).toThrow('Cant retrieve the error message from a successful result.')
  })

  it('should not throw an error if a successful result is created', () => {
    const result = Result.ok(200, 'Success value')

    expect(result.isSuccess).toBe(true)
    expect(result.isFailure).toBe(false)
    expect(result.value).toBe('Success value')
  })

  it('should throw an error if a failed result does not contain an error message', () => {
    expect(() =>
      Result.fail<string>(undefined as unknown as string, 400)
    ).toThrow(
      'InvalidOperation: A failing result needs to contain an error message'
    )
  })
})
