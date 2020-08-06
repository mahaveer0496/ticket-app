import { ErrorRequestHandler } from 'express'
import { CustomError } from '../errors/custom-error'

// to tell express that handler is for ErrorHandling, all 4 params have to be defined
export const errorHandler: ErrorRequestHandler = (err, req, res, next) => {
  if (err instanceof CustomError) {
    return res.status(err.statusCode).send({ errors: err.serializeErrors() })
  }

  res.status(500).send({ errors: [{ message: 'Something went wrong' }] })
}
