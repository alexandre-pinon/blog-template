import { model, Schema } from 'mongoose'
import { ImageDoc } from '../../../types'

const schema = new Schema<ImageDoc>({
  name: {
    type: String,
    required: [true, 'An image needs a name'],
  },
  url: {
    type: String,
    required: [true, 'An image needs an url'],
    unique: true,
  },
  mimetype: {
    type: String,
  },
  height: {
    type: String,
  },
  width: {
    type: String,
  },
  size: {
    type: Number,
  },
})

export const ImageModel = model<ImageDoc>('images', schema)
