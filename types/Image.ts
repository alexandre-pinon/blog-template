import { Document } from 'mongoose'

export interface Image {
  name: string
  url: string
  mimetype: string
  height?: string
  width?: string
  size?: number
}

export interface ImageDoc extends Image, Document {}
