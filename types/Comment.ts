import { Post } from '.'

export interface Comment {
  name: string
  email: string
  comment: string
  post: Post
}
