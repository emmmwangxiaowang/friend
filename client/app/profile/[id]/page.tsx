'use client';

import { useState } from 'react';
import Link from 'next/link';
import PostCard from '../../components/PostCard';

type User = {
  id: string;
  name: string;
  avatar: string;
  bio: string;
  age: number;
  gender: string;
  location: string;
  interests: string[];
  photos: string[];
  followers: number;
  following: number;
  posts: number;
  isFollowing: boolean;
};

type Post = {
  id: string;
  author: string;
  content: string;
  image?: string;
  likes: number;
  comments: number;
  date: string;
};

export default function UserProfilePage({ params }: { params: { id: string } }) {
  const [user] = useState<User>({
    id: params.id,
    name: '林星',
    avatar: 'https://i.pravatar.cc/150?img=1',
    bio: '喜欢探索，热爱旅行，摄影爱好者。',
    age: 28,
    gender: '女',
    location: '上海',
    interests: ['摄影', '旅行', '音乐', '阅读'],
    photos: [
      'https://picsum.photos/400/600?random=1',
      'https://picsum.photos/400/600?random=2',
      'https://picsum.photos/400/600?random=3',
    ],
    followers: 1280,
    following: 56,
    posts: 42,
    isFollowing: false,
  });

  const [userPosts] = useState<Post[]>([
    { id: '1', author: '林星', content: '今天天气不错，来聊聊心动瞬间吧！', image: 'https://picsum.photos/800/400?random=1', likes: 12, comments: 4, date: '今天' },
    { id: '2', author: '林星', content: '分享一本好书《小王子》，每次读都有新的感悟。', likes: 8, comments: 2, date: '昨天' },
  ]);

  const [isFollowing, setIsFollowing] = useState(user.isFollowing);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <header className="sticky top-0 z-10 bg-white dark:bg-gray-800 shadow-sm">
        <div className="max-w-2xl mx-auto px-4 py-3 flex items-center justify-between">
          <Link href="/discover" className="text-purple-600 dark:text-purple-400">
            ← 返回
          </Link>
          <h1 className="font-bold">个人主页</h1>
          <button className="text-gray-500 hover:text-gray-700 dark:hover:text-gray-300">
            •••
          </button>
        </div>
      </header>

      <div className="relative">
        <div className="h-32 bg-gradient-to-r from-purple-600 to-pink-600" />
        <div className="max-w-2xl mx-auto px-4 -mt-16">
          <div className="flex items-end space-x-4">
            <img
              src={user.avatar}
              alt={user.name}
              className="w-32 h-32 rounded-full border-4 border-white dark:border-gray-900 object-cover"
            />
            <div className="flex-1 pb-4">
              <div className="flex items-center justify-between">
                <div>
                  <h1 className="text-2xl font-bold">{user.name}</h1>
                  <p className="text-gray-600 dark:text-gray-400">{user.age}岁 · {user.location}</p>
                </div>
                <button
                  onClick={() => setIsFollowing(!isFollowing)}
                  className={`px-6 py-2 rounded-full font-medium transition-colors ${
                    isFollowing
                      ? 'bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200'
                      : 'bg-purple-600 text-white hover:bg-purple-700'
                  }`}
                >
                  {isFollowing ? '已关注' : '关注'}
                </button>
              </div>
            </div>
          </div>
          
          <p className="mt-4 text-gray-600 dark:text-gray-300">{user.bio}</p>
          
          <div className="flex space-x-6 mt-4">
            <div className="text-center">
              <div className="text-xl font-bold">{user.posts}</div>
              <div className="text-xs text-gray-500">帖子</div>
            </div>
            <div className="text-center">
              <div className="text-xl font-bold">{user.followers}</div>
              <div className="text-xs text-gray-500">粉丝</div>
            </div>
            <div className="text-center">
              <div className="text-xl font-bold">{user.following}</div>
              <div className="text-xs text-gray-500">关注</div>
            </div>
          </div>
          
          <div className="flex flex-wrap gap-2 mt-4">
            {user.interests.map((interest, index) => (
              <span
                key={index}
                className="px-3 py-1 bg-purple-100 dark:bg-purple-900 text-purple-800 dark:text-purple-200 rounded-full text-sm"
              >
                {interest}
              </span>
            ))}
          </div>
        </div>
      </div>

      <main className="max-w-2xl mx-auto px-4 py-6">
        <div className="mb-6">
          <h3 className="text-lg font-bold mb-3">📸 相册</h3>
          <div className="grid grid-cols-3 gap-2">
            {user.photos.map((photo, index) => (
              <img
                key={index}
                src={photo}
                alt={`照片 ${index + 1}`}
                className="w-full h-24 object-cover rounded-lg cursor-pointer hover:opacity-80 transition-opacity"
              />
            ))}
          </div>
        </div>
        
        <div>
          <h3 className="text-lg font-bold mb-3">📝 动态</h3>
          <div className="space-y-4">
            {userPosts.map(post => (
              <PostCard key={post.id} post={post} />
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
