import { Post } from '.'

export interface Category {
  name: string
  slug: string
  posts: Post[]
}
