'use client';

import { useState } from 'react';
import Link from 'next/link';

type Group = {
  id: string;
  name: string;
  avatar: string;
  description: string;
  members: number;
  isActive: boolean;
};

const mockGroups: Group[] = [
  { id: '1', name: '读书会', avatar: 'https://i.pravatar.cc/150?img=10', description: '分享好书，交流心得', members: 128, isActive: true },
  { id: '2', name: '旅行爱好者', avatar: 'https://i.pravatar.cc/150?img=11', description: '一起探索世界', members: 256, isActive: true },
  { id: '3', name: '美食分享', avatar: 'https://i.pravatar.cc/150?img=12', description: '分享美食，享受生活', members: 64, isActive: false },
  { id: '4', name: '摄影交流', avatar: 'https://i.pravatar.cc/150?img=13', description: '记录美好瞬间', members: 96, isActive: true },
];

export default function GroupsPage() {
  const [groups] = useState<Group[]>(mockGroups);
  const [filter, setFilter] = useState<'all' | 'my'>('all');

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <header className="sticky top-0 z-10 bg-white dark:bg-gray-800 shadow-sm">
        <div className="max-w-2xl mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            <h1 className="text-xl font-bold text-purple-600 dark:text-purple-400">群组</h1>
            <button className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
              ➕
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
              onClick={() => setFilter('my')}
              className={`px-4 py-1 rounded-full text-sm font-medium transition-colors ${
                filter === 'my'
                  ? 'bg-purple-600 text-white'
                  : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600'
              }`}
            >
              我的群组
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-2xl mx-auto px-4 py-6">
        <div className="space-y-4">
          {groups.map(group => (
            <div
              key={group.id}
              className="bg-white dark:bg-gray-800 rounded-xl shadow-sm overflow-hidden hover:shadow-md transition-shadow"
            >
              <div className="p-4">
                <div className="flex items-center space-x-4">
                  <div className="relative">
                    <img
                      src={group.avatar}
                      alt={group.name}
                      className="w-16 h-16 rounded-full object-cover"
                    />
                    {group.isActive && (
                      <div className="absolute bottom-0 right-0 w-4 h-4 bg-green-500 rounded-full border-2 border-white dark:border-gray-800" />
                    )}
                  </div>
                  
                  <div className="flex-1">
                    <h3 className="font-bold">{group.name}</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-300">{group.description}</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                      👥 {group.members} 成员
                    </p>
                  </div>
                  
                  <button className="px-4 py-2 bg-purple-600 text-white rounded-full text-sm font-medium hover:bg-purple-700 transition-colors">
                    加入
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        {groups.length === 0 && (
          <div className="text-center py-12">
            <div className="text-4xl mb-3">👥</div>
            <p className="text-gray-500">没有找到群组</p>
            <button className="mt-4 px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors">
              创建群组
            </button>
          </div>
        )}
      </main>
    </div>
  );
}
