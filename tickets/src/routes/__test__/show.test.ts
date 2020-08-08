import request from 'supertest'
import { app } from '../../app'
import { Ticket } from '../../models/ticket'

const route = '/api/tickets/:id'
describe(`POST ${route}`, () => {
  it('should return 404 if ticket not found', async () => {
    await request(app).get('/api/tickets/dowakdo').send().expect(404)
  })
  it('should return ticket for valid id', async () => {})
})
