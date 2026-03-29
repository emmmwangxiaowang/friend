'use client';

import { useState } from 'react';
import Link from 'next/link';

type User = {
  id: string;
  name: string;
  avatar: string;
  bio: string;
  age: number;
  distance: string;
  interests: string[];
  isOnline: boolean;
  lastActive: string;
};

const mockUsers: User[] = [
  { id: '1', name: '林星', avatar: 'https://i.pravatar.cc/150?img=1', bio: '喜欢探索，热爱旅行', age: 28, distance: '3.2km', interests: ['摄影', '音乐', '文学'], isOnline: true, lastActive: '刚刚' },
  { id: '2', name: '周子安', avatar: 'https://i.pravatar.cc/150?img=2', bio: '爱好跑步和美食', age: 26, distance: '5.8km', interests: ['跑步', '美食'], isOnline: false, lastActive: '30分钟前' },
  { id: '3', name: '姚雨樱', avatar: 'https://i.pravatar.cc/150?img=3', bio: '书虫，爱猫', age: 30, distance: '2.1km', interests: ['阅读', '猫咪'], isOnline: true, lastActive: '5分钟前' },
  { id: '4', name: '张明', avatar: 'https://i.pravatar.cc/150?img=4', bio: '程序员，喜欢科技', age: 32, distance: '4.5km', interests: ['科技', '游戏'], isOnline: false, lastActive: '2小时前' },
  { id: '5', name: '王芳', avatar: 'https://i.pravatar.cc/150?img=5', bio: '设计师，热爱生活', age: 27, distance: '1.8km', interests: ['设计', '艺术'], isOnline: true, lastActive: '10分钟前' },
];

export default function DiscoverPage() {
  const [users] = useState<User[]>(mockUsers);
  const [filter, setFilter] = useState<'all' | 'online' | 'nearby'>('all');

  const filteredUsers = users.filter(user => {
    if (filter === 'online') return user.isOnline;
    if (filter === 'nearby') return parseFloat(user.distance) < 3;
    return true;
  });

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <header className="sticky top-0 z-10 bg-white dark:bg-gray-800 shadow-sm">
        <div className="max-w-2xl mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            <h1 className="text-xl font-bold text-purple-600 dark:text-purple-400">发现</h1>
            <button className="text-sm text-gray-500 hover:text-gray-700 dark:hover:text-gray-300">
              筛选
            </button>
          </div>
          
          <div className="flex space-x-2 mt-3">
            <button
              onClick={() => setFilter('all')}
              className={`px-4 py-1 rounded-full text-sm font-medium transition-colors ${
                filter === 'all'
                  ? 'bg-purple-600 text-white'
                  : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600'
              }`}
            >
              全部
            </button>
            <button
              onClick={() => setFilter('online')}
              className={`px-4 py-1 rounded-full text-sm font-medium transition-colors ${
                filter === 'online'
                  ? 'bg-purple-600 text-white'
                  : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600'
              }`}
            >
              在线
            </button>
            <button
              onClick={() => setFilter('nearby')}
              className={`px-4 py-1 rounded-full text-sm font-medium transition-colors ${
                filter === 'nearby'
                  ? 'bg-purple-600 text-white'
                  : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600'
              }`}
            >
              附近
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-2xl mx-auto px-4 py-6">
        <div className="space-y-4">
          {filteredUsers.map(user => (
            <div
              key={user.id}
              className="bg-white dark:bg-gray-800 rounded-xl shadow-sm overflow-hidden hover:shadow-md transition-shadow"
            >
              <div className="p-4">
                <div className="flex items-start space-x-4">
                  <div className="relative">
                    <img
                      src={user.avatar}
                      alt={user.name}
                      className="w-16 h-16 rounded-full object-cover"
                    />
                    {user.isOnline && (
                      <div className="absolute bottom-0 right-0 w-4 h-4 bg-green-500 rounded-full border-2 border-white dark:border-gray-800" />
                    )}
                  </div>
                  
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-bold">{user.name}, {user.age}</h3>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          📍 {user.distance} · {user.isOnline ? '在线' : user.lastActive}
                        </p>
                      </div>
                      <button className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
                        ❤️
                      </button>
                    </div>
                    
                    <p className="text-sm text-gray-600 dark:text-gray-300 mt-2">{user.bio}</p>
                    
                    <div className="flex flex-wrap gap-1 mt-2">
                      {user.interests.slice(0, 3).map((interest, index) => (
                        <span
                          key={index}
                          className="text-xs bg-purple-100 dark:bg-purple-900 text-purple-800 dark:text-purple-200 px-2 py-1 rounded-full"
                        >
                          {interest}
                        </span>
                      ))}
                    </div>
                    
                    <div className="flex space-x-2 mt-3">
                      <Link
                        href={`/profile/${user.id}`}
                        className="flex-1 bg-purple-600 text-white py-2 rounded-lg text-center text-sm font-medium hover:bg-purple-700 transition-colors"
                      >
                        查看主页
                      </Link>
                      <button className="flex-1 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 py-2 rounded-lg text-sm font-medium hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors">
                        打招呼
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        {filteredUsers.length === 0 && (
          <div className="text-center py-12">
            <div className="text-4xl mb-3">😢</div>
            <p className="text-gray-500">没有找到符合条件的用户</p>
          </div>
        )}
      </main>
    </div>
  );
}
