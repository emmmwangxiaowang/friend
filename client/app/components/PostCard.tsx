"use client";
import React from 'react'

export type Post = {
  id: string
  author: string
  content: string
  image?: string
  likes?: number
  comments?: number
  date?: string
}

export default function PostCard({ post }: { post: Post }) {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-4 mb-4">
      <div className="flex items-center space-x-2 mb-2">
        <span className="text-sm font-semibold">{post.author}</span>
        <span className="text-xs text-gray-500">{post.date ?? ''}</span>
      </div>
      <div className="text-sm text-gray-800 dark:text-gray-100 mb-2">{post.content}</div>
      {post.image && (
        <img src={post.image} alt="post" className="w-full rounded-md max-h-60 object-cover" />
      )}
      <div className="mt-2 text-xs text-gray-500 dark:text-gray-300">{post.likes ?? 0} 次点赞 · {post.comments ?? 0} 评论</div>
    </div>
  )
}
