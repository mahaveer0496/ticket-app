import express, { Request, Response } from 'express'
import { body, validationResult } from 'express-validator'
const router = express.Router()

router.post(
  '/api/users/signup',
  [
    body('email').isEmail().withMessage('Email must be valid'),
    body('password')
      .trim()
      .isLength({ min: 4 })
      .withMessage('Password too short'),
  ],
  (req: Request, res: Response) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      errors.throw()
    }
    console.log('this wont run')

    const { email, password } = req.body
    res.send(req.body)
  },
)

export { router as signupRouter }
