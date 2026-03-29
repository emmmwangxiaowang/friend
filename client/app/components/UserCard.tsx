"use client";
import React from 'react'

export type User = {
  id: string
  name: string
  avatar?: string
  bio?: string
  age?: number
  interests?: string[]
}

export default function UserCard({ user }: { user: User }) {
  return (
    <div className="flex items-center space-x-3 p-3 bg-white dark:bg-gray-800 rounded-lg shadow-sm">
      <img src={user.avatar || 'https://via.placeholder.com/48'} alt="avatar" className="w-12 h-12 rounded-full object-cover" />
      <div>
        <div className="text-sm font-semibold">{user.name}</div>
        {user.bio && <div className="text-xs text-gray-500 dark:text-gray-300">{user.bio}</div>}
      </div>
    </div>
  )
}
