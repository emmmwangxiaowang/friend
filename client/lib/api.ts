// Lightweight API client with mock data fallback for development
import type { User } from '../app/components/UserCard'
import type { Post } from '../app/components/PostCard'

export type UserT = {
  id: string
  name: string
  avatar?: string
  bio?: string
  age?: number
  interests?: string[]
}

export type PostT = {
  id: string
  author: string
  content: string
  image?: string
  likes?: number
  comments?: number
  date?: string
}

// Simple in-file mock data for development
const mockUsers: UserT[] = [
  { id: 'u1', name: '林星', bio: '喜欢探索，热爱旅行', age: 28, interests: ['摄影','音乐','文学'], avatar: 'https://i.pravatar.cc/100?img=1' },
  { id: 'u2', name: '周子安', bio: '爱好跑步和美食', age: 26, interests: ['跑步','美食'], avatar: 'https://i.pravatar.cc/100?img=2' },
  { id: 'u3', name: '姚雨樱', bio: '书虫，爱猫', age: 30, interests: ['阅读','猫咪'], avatar: 'https://i.pravatar.cc/100?img=3' }
]

const mockPosts: PostT[] = [
  { id: 'p1', author: '林星', content: '今天天气不错，来聊聊心动瞬间吧！', date: '今天', image: 'https://picsum.photos/800/400?random=1', likes: 12, comments: 4 },
  { id: 'p2', author: '周子安', content: '刚吃完夜宵，脑子里全是旅行的计划。', date: '2小時前', likes: 8, comments: 2 },
]

// API client wrappers
export async function fetchUsers(): Promise<UserT[]> {
  try {
    const res = await fetch('/api/users')
    if (!res.ok) throw new Error('fetch users failed')
    return res.json()
  } catch {
    // fallback to mock data during development
    return mockUsers
  }
}

export async function fetchPosts(): Promise<PostT[]> {
  try {
    const res = await fetch('/api/posts')
    if (!res.ok) throw new Error('fetch posts failed')
    return res.json()
  } catch {
    return mockPosts
  }
}

export async function fetchChats(): Promise<any[]> {
  // Minimal placeholder for chat lists; use mock data
  return [
    { id: 'c1', title: '林星', lastMessage: '明天一起去看展览?', unread: 2 },
    { id: 'c2', title: '周子安', lastMessage: '收到你的消息啦！', unread: 0 }
  ]
}
