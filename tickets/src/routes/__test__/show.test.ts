import request from 'supertest'
import { app } from '../../app'
import { Ticket } from '../../models/ticket'
import mongoose, { mongo } from 'mongoose'
const route = (id = new mongoose.Types.ObjectId().toHexString()) =>
  `/api/tickets/${id}`

describe(`GET /api/tickets/:id`, () => {
  it('should return 404 if ticket not found', async () => {
    await request(app).get(route()).send().expect(404)
  })

  it('should return ticket for valid id', async () => {
    const payload = {
      title: 'this is valid',
      price: 10,
    }
    const response = await request(app)
      .post('/api/tickets')
      .set('Cookie', global.signin())
      .send(payload)

    const ticketResponse = await request(app)
      .get(route(response.body.id))
      .send()
      .expect(200)

    expect(ticketResponse.body).toMatchObject(payload)
  })
})
