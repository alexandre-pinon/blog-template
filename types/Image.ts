import { Document } from 'mongoose'

export interface Image {
  name: string
  url: string
  mimetype: string
  height?: string
  width?: string
  size?: number
}

/*
? Remove once apollo-datasource-mongodb is updated?
* Source: https://github.com/GraphQLGuide/apollo-datasource-mongodb/issues/88
*/
export interface ImageDoc extends Image, Document {}
