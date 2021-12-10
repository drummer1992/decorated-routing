export class ApiError extends Error {
  constructor(message, statusCode) {
    super()

    this.message = message
    this.statusCode = statusCode
    this.name = this.constructor.name
  }
}