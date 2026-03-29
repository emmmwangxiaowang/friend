import React from 'react'
import { fetchUsers } from '../lib/api'
import UserCard from '../components/UserCard'

export default async function GroupsPage() {
  const users = await fetchUsers()
  return (
    <main className="p-4 pt-6">
      <h1 className="text-2xl font-bold mb-4">群组 - 列表</h1>
      <div className="space-y-3">
        {users.map((u) => (
          <UserCard key={u.id} user={u} />
        ))}
      </div>
    </main>
  )
}
