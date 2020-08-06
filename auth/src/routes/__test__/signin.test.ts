import request from 'supertest'
import { app } from '../../app'

it('should fail for email that doesnt exist', async () => {
  await request(app)
    .post('/api/users/signin')
    .send({ email: 'test@test.com', password: 'password' })
    .expect(400)
})

it('should fail for incorrect password', async () => {
  await request(app)
    .post('/api/users/signup')
    .send({ email: 'test@test.com', password: 'password' })
    .expect(201)

  await request(app)
    .post('/api/users/signin')
    .send({ email: 'test@test.com', password: 'password_wrong' })
    .expect(400)
})

it('should sets cookie for correct signin', async () => {
  await request(app)
    .post('/api/users/signup')
    .send({ email: 'test@test.com', password: 'password' })
    .expect(201)

  const response = await request(app)
    .post('/api/users/signin')
    .send({ email: 'test@test.com', password: 'password' })
    .expect(200)

  expect(response.get('Set-Cookie')).toBeDefined()
})
