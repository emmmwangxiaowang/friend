'use client';

import { useState } from 'react';

type User = {
  id: string;
  name: string;
  avatar: string;
  bio: string;
  age: number;
  distance: string;
  interests: string[];
};

const mockUsers: User[] = [
  { id: '1', name: '林星', avatar: 'https://i.pravatar.cc/150?img=1', bio: '喜欢探索，热爱旅行', age: 28, distance: '3.2km', interests: ['摄影', '音乐', '文学'] },
  { id: '2', name: '周子安', avatar: 'https://i.pravatar.cc/150?img=2', bio: '爱好跑步和美食', age: 26, distance: '5.8km', interests: ['跑步', '美食'] },
  { id: '3', name: '姚雨樱', avatar: 'https://i.pravatar.cc/150?img=3', bio: '书虫，爱猫', age: 30, distance: '2.1km', interests: ['阅读', '猫咪'] },
  { id: '4', name: '张明', avatar: 'https://i.pravatar.cc/150?img=4', bio: '程序员，喜欢科技', age: 32, distance: '4.5km', interests: ['科技', '游戏'] },
];

export default function UserRecommendations() {
  const [users] = useState<User[]>(mockUsers);

  return (
    <div className="mb-6">
      <div className="flex justify-between items-center px-4 mb-3">
        <h3 className="text-lg font-bold">✨ 为你推荐</h3>
        <button className="text-purple-600 dark:text-purple-400 text-sm hover:underline">查看全部</button>
      </div>
      <div className="flex overflow-x-auto px-4 space-x-4 pb-2">
        {users.map((user) => (
          <div
            key={user.id}
            className="flex-shrink-0 w-48 bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow"
          >
            <div className="relative">
              <img src={user.avatar} alt={user.name} className="w-full h-32 object-cover" />
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-3">
                <div className="text-white font-bold">{user.name}, {user.age}</div>
                <div className="text-white/80 text-xs">📍 {user.distance}</div>
              </div>
            </div>
            <div className="p-3">
              <p className="text-sm text-gray-600 dark:text-gray-300 mb-2">{user.bio}</p>
              <div className="flex flex-wrap gap-1">
                {user.interests.slice(0, 3).map((interest, index) => (
                  <span
                    key={index}
                    className="text-xs bg-purple-100 dark:bg-purple-900 text-purple-800 dark:text-purple-200 px-2 py-1 rounded-full"
                  >
                    {interest}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
