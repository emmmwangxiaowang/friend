import React from 'react'
import { fetchChats } from '../lib/api'

export default async function ChatsPage() {
  const chats = await fetchChats()
  return (
    <main className="p-4 pt-6">
      <h1 className="text-2xl font-bold mb-4">聊天 - 会话列表</h1>
      <ul className="space-y-3">
        {chats.map((c) => (
          <li key={c.id} className="p-3 bg-white dark:bg-gray-800 rounded-lg shadow-sm">
            <div className="flex justify-between items-center">
              <span className="font-semibold">{c.title}</span>
              {c.unread > 0 && (
                <span className="text-xs bg-red-500 text-white rounded-full px-2 py-0.5">{c.unread}</span>
              )}
            </div>
            <div className="text-sm text-gray-500">最近消息: {c.lastMessage}</div>
          </li>
        ))}
      </ul>
    </main>
  )
}
