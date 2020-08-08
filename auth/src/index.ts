import mongoose from 'mongoose'
import { app } from './app'

const PORT = 3000

const start = async () => {
  if (!process.env.JWT_KEY) throw new Error('JWT not defined bruh')

  try {
    await mongoose.connect(process.env.MONGO_URI!, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
    })
    console.log('Connected to MongoDB')
  } catch (error) {
    console.error(error)
  }

  app.listen(PORT, () => {
    console.log(`Listening on http://localhost:${PORT}`)
  })
}

start()
