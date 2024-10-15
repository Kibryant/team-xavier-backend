export class Result<T, E = string> {
  public isSuccess: boolean
  public isFailure: boolean
  public error?: E
  private _value?: T

  private constructor(isSuccess: boolean, error?: E, value?: T) {
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
    Object.freeze(this)
  }

  get value(): T {
    if (!this.isSuccess) {
      throw new Error('Cant retrieve the value from a failed result.')
    }

    return this._value as T
  }

  public static ok<U>(value?: U): Result<U> {
    return new Result<U>(true, undefined, value)
  }

  public static fail<U, E = string>(error: E): Result<U, E> {
    return new Result<U, E>(false, error)
  }

  public getErrorValue(): E {
    if (!this.error) {
      throw new Error(
        'Cant retrieve the error message from a successful result.'
      )
    }

    return this.error
  }

  public map<U>(fn: (value: T) => U): Result<U, E> {
    if (this.isSuccess) {
      return new Result<U, E>(true, undefined, fn(this._value as T))
    }

    return Result.fail(this.error as E)
  }

  public match<R>(onSuccess: (value: T) => R, onFailure: (error: E) => R): R {
    if (this.isSuccess) {
      return onSuccess(this._value as T)
    }
    return onFailure(this.error as E)
  }
}
