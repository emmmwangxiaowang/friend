import React from 'react'

export default function SoulTestTake({ params }: { params: { id: string } }) {
  return (
    <main className="p-4 pt-6">
      <h1 className="text-xl font-semibold mb-2">测试 {params.id}</h1>
      <div className="bg-white dark:bg-gray-800 rounded-lg p-4">测试题表单占位</div>
    </main>
  )
}
