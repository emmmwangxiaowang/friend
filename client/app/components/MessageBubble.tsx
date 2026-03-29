"use client";
import React from 'react'

export type Message = {
  id: string
  text: string
  fromMe?: boolean
  date?: string
}

export default function MessageBubble({ message }: { message: Message }) {
  const align = message.fromMe ? 'items-end' : 'items-start'
  const bg = message.fromMe ? 'bg-blue-500 text-white' : 'bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-gray-100'
  return (
    <div className={`flex ${align} mb-2`}> 
      <div className={`rounded-lg px-3 py-2 max-w-xs ${bg}`}>
        <div className="text-sm">{message.text}</div>
        {message.date && <div className="text-xs opacity-70 mt-1">{message.date}</div>}
      </div>
    </div>
  )
}
