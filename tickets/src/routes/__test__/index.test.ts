import request from 'supertest'
import { app } from '../../app'
import { Ticket } from '../../models/ticket'
import mongoose, { mongo } from 'mongoose'
const route = `/api/tickets/`

const createTicket = () =>
  request(app).post('/api/tickets').set('Cookie', global.signin()).send({
    title: 'this is valid',
    price: 10,
  })

describe(`GET /api/tickets/`, () => {
  it('should fetch a list of tickets', async () => {
    await createTicket()
    await createTicket()

    const response = await request(app).get(route).send().expect(200)
    expect(response.body.length).toEqual(2)
  })
})
