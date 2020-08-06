import express, { Response, Request } from 'express'
import { body } from 'express-validator'
import { User } from '../models/user'
import { validateRequest } from '../middlewares/validate-request'

const router = express.Router()

router.get(
  '/api/users/signin',
  [
    body('email').isEmail().withMessage('Email must be valid'),
    body('password').trim().notEmpty().withMessage('Password required'),
  ],
  validateRequest,
  async (req: Request, res: Response) => {
    const { email, password } = req.body
    const existingUser = await User.findOne({ email })
  },
)

export { router as signinRouter }
