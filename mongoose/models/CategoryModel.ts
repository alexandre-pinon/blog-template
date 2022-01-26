import { model, Schema } from 'mongoose'
import { Category } from '../../types'

const schema = new Schema<Category>({
  name: {
    type: String,
    required: [true, 'A category needs a name'],
  },
  slug: {
    type: String,
    required: [true, 'A category needs a slug'],
    unique: true,
  },
  posts: [
    {
      type: [Schema.Types.ObjectId],
    },
  ],
})

export const CategoryModel = model<Category>('categories', schema)
