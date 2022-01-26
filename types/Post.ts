import { Category, Comment, Image, User } from '.'

export type Post = {
  title: string
  excerpt: string
  slug: string
  content: string
  featuredImage: Image
  featuredPost: boolean
  author: User
  categories: Category[]
  comments: Comment[]
}
