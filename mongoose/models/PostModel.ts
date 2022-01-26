import { model, Schema } from 'mongoose'
import { Post } from '../../types'

const schema = new Schema<Post>({
  title: {
    type: String,
    required: [true, 'A post needs a title'],
  },
  excerpt: {
    type: String,
    required: [true, 'A post needs an excerpt'],
  },
  slug: {
    type: String,
    required: [true, 'A post needs a slug'],
    unique: true,
  },
  content: {
    type: String,
    required: [true, 'A post needs content'],
  },
  featuredImage: {
    type: Schema.Types.ObjectId,
    required: [true, 'A post needs an image'],
  },
  featuredPost: {
    type: Boolean,
    required: [true, 'A post is either a featured or not featured'],
  },
  author: {
    type: Schema.Types.ObjectId,
    required: [true, 'A post needs an author'],
  },
  categories: [
    {
      type: Schema.Types.ObjectId,
      required: [true, 'A post needs to be associated with at least one category'],
    },
  ],
  comments: [
    {
      type: [Schema.Types.ObjectId],
    },
  ],
})

export const PostModel = model<Post>('posts', schema)
