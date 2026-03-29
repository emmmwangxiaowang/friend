import React from 'react'
import MessageBubble from '../../components/MessageBubble'

export default function ChatDetail({ params }: { params: { id: string } }) {
  const messages = [
    { id: 'm1', text: '嗨！最近怎么样？', fromMe: false, date: '10:00' },
    { id: 'm2', text: '还不错，你呢？', fromMe: true, date: '10:01' },
  ]
  return (
    <main className="p-4 pt-6">
      <h1 className="text-xl font-semibold mb-2">对话 {params.id}</h1>
      <div className="space-y-2">
        {messages.map((m) => (
          <MessageBubble key={m.id} message={m as any} />
        ))}
      </div>
    </main>
  )
}
