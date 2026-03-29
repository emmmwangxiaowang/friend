import React from 'react'
import PostCard from '../components/PostCard'
import { fetchPosts } from '../lib/api'

export default async function CommunityPage() {
  const posts = await fetchPosts()
  return (
    <main className="p-4 pt-6">
      <h1 className="text-2xl font-bold mb-4">社区 - 动态</h1>
      {posts.map((p) => (
        <PostCard key={p.id} post={p as any} />
      ))}
    </main>
  )
}
