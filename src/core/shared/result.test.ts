import { describe, it, expect } from 'bun:test'
import { Result } from './result'

describe('Result', () => {
  it('should create a successful result with a value', () => {
    const result = Result.ok('Success value')

    expect(result.isSuccess).toBe(true)
    expect(result.isFailure).toBe(false)
    expect(result.value).toBe('Success value')
    expect(() => result.getErrorValue()).toThrow(
      'Cant retrieve the error message from a successful result.'
    )
  })

  it('should create a successful result with undefined value', () => {
    const result = Result.ok()

    expect(result.isSuccess).toBe(true)
    expect(result.isFailure).toBe(false)
    expect(result.value).toBeUndefined()
  })

  it('should create a failed result with an error message', () => {
    const result = Result.fail<string>('Failure message')

    expect(result.isSuccess).toBe(false)
    expect(result.isFailure).toBe(true)
    expect(result.getErrorValue()).toBe('Failure message')
    expect(() => result.value).toThrow(
      'Cant retrieve the value from a failed result.'
    )
  })

  it('should throw error if success is created with an error', () => {
    expect(() => {
      Result.ok<string>('Success value').getErrorValue()
    }).toThrow('Cant retrieve the error message from a successful result.')
  })

  describe('map', () => {
    it('should apply the mapping function on a successful result', () => {
      const result = Result.ok(5)
      const mappedResult = result.map(val => val * 2)

      expect(mappedResult.isSuccess).toBe(true)
      expect(mappedResult.value).toBe(10)
    })

    it('should not apply the mapping function on a failed result', () => {
      const result = Result.fail<number>('Failed to retrieve value')
      const mappedResult = result.map(val => val * 2)

      expect(mappedResult.isFailure).toBe(true)
      expect(mappedResult.getErrorValue()).toBe('Failed to retrieve value')
    })
  })

  describe('match', () => {
    it('should execute onSuccess function for successful result', () => {
      const result = Result.ok(10)
      const matchResult = result.match(
        value => `Success with ${value}`,
        error => `Failure with ${error}`
      )

      expect(matchResult).toBe('Success with 10')
    })

    it('should execute onFailure function for failed result', () => {
      const result = Result.fail<number>('Error occurred')
      const matchResult = result.match(
        value => `Success with ${value}`,
        error => `Failure with ${error}`
      )

      expect(matchResult).toBe('Failure with Error occurred')
    })
  })

  it('should not throw an error if a successful result is created', () => {
    const result = Result.ok('Success value')

    expect(result.isSuccess).toBe(true)
    expect(result.isFailure).toBe(false)
    expect(result.value).toBe('Success value')
  })

  it('should throw an error if a failed result does not contain an error message', () => {
    expect(() => Result.fail<string>(undefined as unknown as string)).toThrow(
      'InvalidOperation: A failing result needs to contain an error message'
    )
  })
})
