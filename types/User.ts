import { Image, Post } from '.'

export type User = {
  name: string
  photo: Image
  bio: string
  posts: Post[]
}
