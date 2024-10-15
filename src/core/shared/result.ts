export class Result<T, E = string> {
  public isSuccess: boolean
  public isFailure: boolean
  public statusCode: number
  public error?: E
  private _value?: T

  private constructor(
    isSuccess: boolean,
    statusCode: number,
    error?: E,
    value?: T
  ) {
    if (isSuccess && error) {
      throw new Error(
        'InvalidOperation: A result cannot be successful and contain an error'
      )
    }
    if (!isSuccess && !error) {
      throw new Error(
        'InvalidOperation: A failing result needs to contain an error message'
      )
    }

    this.isSuccess = isSuccess
    this.isFailure = !isSuccess
    this.error = error
    this._value = value
    this.statusCode = statusCode
    Object.freeze(this)
  }

  get value(): T {
    if (!this.isSuccess) {
      throw new Error('Cant retrieve the value from a failed result.')
    }

    return this._value as T
  }

  public static ok<U>(statusCode: number, value?: U): Result<U> {
    return new Result<U>(true, statusCode, undefined, value)
  }

  public static fail<U, E = string>(
    error: E,
    statusCode: number
  ): Result<U, E> {
    return new Result<U, E>(false, statusCode, error, undefined)
  }

  public getErrorValue(): E {
    if (!this.error) {
      throw new Error(
        'Cant retrieve the error message from a successful result.'
      )
    }

    return this.error
  }
}
