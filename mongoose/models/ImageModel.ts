import { model, Schema } from 'mongoose'
import { Image } from '../../types'

const schema = new Schema<Image>({
  name: {
    type: String,
    required: [true, 'An image needs a name'],
  },
  src: {
    type: String,
    required: [true, 'An image needs a url'],
  },
  height: {
    type: String,
  },
  width: {
    type: String,
  },
  data: {
    type: Buffer,
    required: [true, 'An image needs to have data associated'],
  },
  size: {
    type: Number,
  },
  mimeType: {
    type: String,
  },
})

export const ImageModel = model<Image>('images', schema)
