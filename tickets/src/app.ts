import express from 'express'
import 'express-async-errors'
import { json } from 'body-parser'
import cookieSession from 'cookie-session'

import { NotFoundError, errorHandler } from '@mveer/common'

const app = express()

app.set('trust proxy', true)
app.use(json())
app.use(
  cookieSession({
    signed: false,
    secure: process.env.NODE_ENV == 'production',
  }),
)

app.all('*', () => {
  throw new NotFoundError()
})

app.use(errorHandler)

export { app }
