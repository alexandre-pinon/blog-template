import { model, Schema } from 'mongoose'
import { Comment } from '../../types'

const schema = new Schema<Comment>({
  name: {
    type: String,
    required: [true, 'A comment needs a name'],
  },
  email: {
    type: String,
    required: [true, 'A comment needs an email'],
  },
  comment: {
    type: String,
    required: [true, 'A comment needs a comment'],
  },
  post: {
    type: [Schema.Types.ObjectId],
    required: [true, 'A comment needs to be associated with a category'],
  },
})

export const CommentModel = model<Comment>('comments', schema)
