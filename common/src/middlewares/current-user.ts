import { RequestHandler } from 'express'
import jwt from 'jsonwebtoken'

interface UserPayload {
  id: string
  email: string
}

// telling typescript - find the Express.Request type defs and add currentUser property to it
declare global {
  namespace Express {
    interface Request {
      currentUser?: UserPayload
    }
  }
}
export const currentUser: RequestHandler = (req, res, next) => {
  if (!req.session?.jwt) {
    return next()
  }

  try {
    const payload = jwt.verify(
      req.session.jwt,
      process.env.JWT_KEY as string,
    ) as UserPayload
    req.currentUser = payload
    // res.send({ currentUser: payload })
  } catch (error) {}

  next()
}
