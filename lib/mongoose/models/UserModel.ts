import { model, Schema } from 'mongoose'
import { User } from '../../../types'

const schema = new Schema<User>({
  name: {
    type: String,
    required: [true, 'A user needs a name'],
  },
  photo: {
    type: Schema.Types.ObjectId,
  },
  bio: {
    type: String,
  },
  posts: [
    {
      type: [Schema.Types.ObjectId],
    },
  ],
})

export const UserModel = model<User>('users', schema)
