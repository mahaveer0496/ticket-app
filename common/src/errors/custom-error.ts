// abstract classes define a blueprint that actual classes have to implement

export abstract class CustomError extends Error {
  abstract statusCode: number

  abstract serializeErrors(): { message: string; field?: string }[]

  constructor(message: string) {
    super(message)
    Object.setPrototypeOf(this, CustomError.prototype)
  }
}
