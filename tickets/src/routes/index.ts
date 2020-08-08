import express, { Request, Response } from 'express'
import { NotFoundError } from '@mveer/common'
import {} from 'express-validator'
import { Ticket } from '../models/ticket'
const router = express.Router()

router.get('/api/tickets/', async (req: Request, res: Response) => {
  const tickets = await Ticket.find({})

  res.send(tickets)
})

export { router as indexTicketRouter }
