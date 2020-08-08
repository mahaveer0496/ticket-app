import request from 'supertest'
import { app } from '../../app'
import { Ticket } from '../../models/ticket'
import mongoose from 'mongoose'

const route = (id = new mongoose.Types.ObjectId().toHexString()) =>
  `/api/tickets/${id}`

describe(`PUT /api/tickets/:id`, () => {
  it('should return 404 if id not found', async () => {
    await request(app)
      .put(route())
      .set('Cookie', global.signin())
      .send({ title: 'this is valid', price: 10 })
      .expect(404)
  })
  it('should return 401 if not authenticated', async () => {
    await request(app)
      .put(route())
      .send({ title: 'this is valid', price: 10 })
      .expect(401)
  })
  it('should return 401 if user does not owned the ticket', async () => {
    const response = await request(app)
      .post('/api/tickets')
      .set('Cookie', global.signin())
      .send({ title: 'this is valid', price: 10 })

    await request(app)
      .put(route(response.body.id))
      .set('Cookie', global.signin())
      .send({ title: 'this is valid too', price: 10 })
      .expect(401)
  })
  it('should return 400 on invalid data', async () => {})

  it('should update ticket for valid input', async () => {})
})
