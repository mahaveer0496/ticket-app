import express, { Request, Response } from 'express'
import { requireAuth, validateRequest } from '@mveer/common'
import { body, validationResult } from 'express-validator'
import { Ticket } from '../models/ticket'
const router = express.Router()

router.post(
  '/api/tickets',
  requireAuth,
  [
    body('title').not().isEmpty().withMessage('Title required'),
    body('price').isFloat({ gt: 0 }).withMessage('Price > 0 required'),
  ],
  validateRequest,
  async (req: Request, res: Response) => {
    const ticket = await Ticket.build({
      ...req.body,
      userId: req.currentUser?.id,
    })
    await ticket.save()
    res.status(201).send(ticket)
  },
)

export { router as createTicketRouter }
