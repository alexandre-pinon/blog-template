import React from 'react'
import { Post } from '../types/post'

const PostCard = ({ post }: { post: Post; key: string }) => {
  return (
    <div>
      {post.title}
      {post.excerpt}
    </div>
  )
}

export default PostCard
