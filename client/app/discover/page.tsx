import React from 'react'
import UserCard, { User as UserType } from '../components/UserCard'
import { fetchUsers } from '../lib/api'

export default async function DiscoverPage() {
  const users: UserType[] = await fetchUsers()
  return (
    <main className="p-4 pt-6">
      <h1 className="text-2xl font-bold mb-4">发现 - 推荐用户</h1>
      <div className="space-y-3">
        {users.map((u) => (
          <UserCard key={u.id} user={u} />
        ))}
      </div>
    </main>
  )
}
