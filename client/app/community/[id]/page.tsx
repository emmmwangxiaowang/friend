import React from 'react'

export default function CommunityPost({ params }: { params: { id: string } }) {
  return (
    <main className="p-4 pt-6">
      <h1 className="text-xl font-semibold mb-2">帖子 {params.id}</h1>
      <div className="bg-white dark:bg-gray-800 rounded-lg p-4">帖子内容占位</div>
    </main>
  )
}
