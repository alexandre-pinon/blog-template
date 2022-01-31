import { Image, Post } from '.'

export interface User {
  name: string
  photo: Image
  bio: string
  posts: Post[]
}
