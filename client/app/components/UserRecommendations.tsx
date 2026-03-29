'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

/** 用户推荐卡片数据结构 */
type User = {
  id: string;
  name: string;
  avatar: string;
  bio: string;
  age: number;
  distance: string;
  interests: string[];
};

/** 备用数据（API不可用时使用） */
const mockUsers: User[] = [
  { id: '1', name: '林星', avatar: 'https://i.pravatar.cc/150?img=1', bio: '喜欢探索，热爱旅行', age: 28, distance: '3.2km', interests: ['摄影', '音乐', '文学'] },
  { id: '2', name: '周子安', avatar: 'https://i.pravatar.cc/150?img=2', bio: '爱好跑步和美食', age: 26, distance: '5.8km', interests: ['跑步', '美食'] },
  { id: '3', name: '姚雨樱', avatar: 'https://i.pravatar.cc/150?img=3', bio: '书虫，爱猫', age: 30, distance: '2.1km', interests: ['阅读', '猫咪'] },
  { id: '4', name: '张明', avatar: 'https://i.pravatar.cc/150?img=4', bio: '程序员，喜欢科技', age: 32, distance: '4.5km', interests: ['科技', '游戏'] },
];

/**
 * 用户推荐组件
 * - 展示系统推荐的用户列表
 * - 点击卡片跳转到用户主页
 * - 支持水平滚动浏览
 */
export default function UserRecommendations() {
  const [users, setUsers] = useState<User[]>([]);
  const router = useRouter();

  /** 从后端API获取推荐用户 */
  useEffect(() => {
    async function fetchRecommendations() {
      try {
        const token = localStorage.getItem('authToken');
        const res = await fetch('/api/discover', {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (!res.ok) throw new Error('API unavailable');
        const data = await res.json();
        setUsers(data.recommendations || mockUsers);
      } catch {
        // API不可用时使用备用数据
        setUsers(mockUsers);
      }
    }
    fetchRecommendations();
  }, []);

  /** 跳转到用户个人主页 */
  const handleUserClick = (userId: string) => {
    router.push(`/profile/${userId}`);
  };

  return (
    <div className="mb-6">
      <div className="flex justify-between items-center px-4 mb-3">
        <h3 className="text-lg font-bold">✨ 为你推荐</h3>
        <button className="text-purple-600 dark:text-purple-400 text-sm hover:underline">查看全部</button>
      </div>
      <div className="flex overflow-x-auto px-4 space-x-4 pb-2">
        {users.map((user) => (
          <button
            key={user.id}
            onClick={() => handleUserClick(user.id)}
            className="flex-shrink-0 w-48 text-left bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow"
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
          </button>
        ))}
      </div>
    </div>
  );
}
