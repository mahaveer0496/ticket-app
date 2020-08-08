import { MongoMemoryServer } from 'mongodb-memory-server'
import request from 'supertest'
import jwt from 'jsonwebtoken'

import mongoose from 'mongoose'
import { app } from '../app'

declare global {
  namespace NodeJS {
    interface Global {
      signin(): string[]
    }
  }
}

let mongo: any
beforeAll(async () => {
  process.env.JWT_KEY = 'asdf'
  mongo = new MongoMemoryServer()
  const mongoUri = await mongo.getUri()
  await mongoose.connect(mongoUri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
})

beforeEach(async () => {
  const collections = await mongoose.connection.db.collections()

  for (const collection of collections) {
    await collection.deleteMany({})
  }
})

afterAll(async () => {
  await mongo.stop()
  await mongoose.connection.close()
})

global.signin = () => {
  const session = JSON.stringify({
    jwt: jwt.sign(
      {
        id: new mongoose.Types.ObjectId().toHexString(),
        email: 'teast@tast.com',
      },
      process.env.JWT_KEY!,
    ),
  })
  const base = Buffer.from(session).toString('base64')
  return [`express:sess=${base}`]
}
