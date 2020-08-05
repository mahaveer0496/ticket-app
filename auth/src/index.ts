import express from 'express'
import { json } from 'body-parser'
import { currentUserRouter } from './routes/current-user'
import { signinRouter } from './routes/signin'
import { signoutRouter } from './routes/signout'
import { signupRouter } from './routes/signup'
import { errorHandler } from './middlewares/error-handler'
import { NotFoundError } from './errors/not-found-error'

const PORT = 3000
const app = express()

app.use(json())

app.get('/', (req, res) => {
  res.send('auth service home')
})

app.use(currentUserRouter)
app.use(signinRouter)
app.use(signoutRouter)
app.use(signupRouter)

app.all('*', () => {
  throw new NotFoundError()
})

app.use(errorHandler)

app.listen(PORT, () => {
  console.log(`Listening on http://localhost:${PORT}`)
})
