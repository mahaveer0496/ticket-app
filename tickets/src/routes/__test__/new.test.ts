import request from 'supertest'
import { app } from '../../app'
import { Ticket } from '../../models/ticket'

const route = '/api/tickets'
describe(`POST ${route}`, () => {
  it('should have handler for the route', async () => {
    const response = await request(app).post(route).send({})
    expect(response.status).not.toEqual(404)
  })

  it('should be accessible for authed only', async () => {
    await request(app).post(route).send({}).expect(401)
  })

  it('should return status not 401 for authed user', async () => {
    const response = await request(app)
      .post(route)
      .set('Cookie', global.signin())
      .send({})
    expect(response.status).not.toEqual(401)
  })

  it('should return status 400 for invalid title', async () => {
    await request(app)
      .post(route)
      .set('Cookie', global.signin())
      .send({
        title: '',
        price: 10,
      })
      .expect(400)
  })

  it('should return status 400 for invalid price', async () => {
    await request(app)
      .post(route)
      .set('Cookie', global.signin())
      .send({
        title: 'this is valid title',
        price: -10,
      })
      .expect(400)
  })

  it('should create ticket for valid input', async () => {
    let tickets = await Ticket.find({})
    expect(tickets.length).toEqual(0)

    await request(app)
      .post(route)
      .set('Cookie', global.signin())
      .send({
        title: 'this is valid title',
        price: 10,
      })
      .expect(201)

    tickets = await Ticket.find({})
    expect(tickets.length).toEqual(1)
  })
})
