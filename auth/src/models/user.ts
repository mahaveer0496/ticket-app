import mongoose from 'mongoose'
import { Password } from '../services/password'

interface UserAttrs {
  email: string
  password: string
}

// this interface is needed to add typeschecking to <model>.statics, otherwise TS will compalint about `userSchema.statics.build` below
interface UserModel extends mongoose.Model<UserDoc> {
  build(attrs: UserAttrs): UserDoc
}

// this tells TS about return type of User Document
interface UserDoc extends mongoose.Document {
  email: string
  password: string
}

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  {
    toJSON: {
      transform(doc, ret) {
        ret.id = ret._id
        delete ret._id
        delete ret.password
        delete ret.__v
      },
    },
  },
)

userSchema.pre('save', async function (done) {
  if (this.isModified('password')) {
    const hashed = await Password.toHash(this.get('password'))
    this.set('password', hashed)
  }
  done()
})

userSchema.statics.build = (attrs: UserAttrs) => {
  return new User(attrs)
}

export const User = mongoose.model<UserDoc, UserModel>('User', userSchema)
