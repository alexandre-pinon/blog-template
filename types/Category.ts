import { Post } from '.'

export type Category = {
  name: string
  slug: string
  posts: Post[]
}
