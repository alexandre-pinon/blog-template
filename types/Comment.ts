import { Post } from '.'

export type Comment = {
  name: string
  email: string
  comment: string
  post: Post
}
