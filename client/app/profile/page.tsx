'use client';

import { useState } from 'react';
import Link from 'next/link';

type UserProfile = {
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
};

const mockProfile: UserProfile = {
  id: '1',
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
};

export default function ProfilePage() {
  const [profile] = useState<UserProfile>(mockProfile);
  const [isEditing, setIsEditing] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="relative">
        <div className="h-32 bg-gradient-to-r from-purple-600 to-pink-600" />
        <div className="max-w-2xl mx-auto px-4 -mt-16">
          <div className="relative">
            <img
              src={profile.avatar}
              alt={profile.name}
              className="w-32 h-32 rounded-full border-4 border-white dark:border-gray-900 object-cover"
            />
            <button
              onClick={() => setIsEditing(!isEditing)}
              className="absolute top-0 right-0 bg-white dark:bg-gray-800 rounded-full p-2 shadow-md hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
            >
              {isEditing ? '✅' : '✏️'}
            </button>
          </div>
          
          <div className="mt-4">
            <h1 className="text-2xl font-bold">{profile.name}</h1>
            <p className="text-gray-600 dark:text-gray-400 mt-1">{profile.bio}</p>
            
            <div className="flex items-center space-x-4 mt-3 text-sm text-gray-500 dark:text-gray-400">
              <span>📍 {profile.location}</span>
              <span>🎂 {profile.age}岁</span>
              <span>👤 {profile.gender}</span>
            </div>
            
            <div className="flex space-x-6 mt-4">
              <div className="text-center">
                <div className="text-xl font-bold">{profile.posts}</div>
                <div className="text-xs text-gray-500">帖子</div>
              </div>
              <div className="text-center">
                <div className="text-xl font-bold">{profile.followers}</div>
                <div className="text-xs text-gray-500">粉丝</div>
              </div>
              <div className="text-center">
                <div className="text-xl font-bold">{profile.following}</div>
                <div className="text-xs text-gray-500">关注</div>
              </div>
            </div>
            
            <div className="flex flex-wrap gap-2 mt-4">
              {profile.interests.map((interest, index) => (
                <span
                  key={index}
                  className="px-3 py-1 bg-purple-100 dark:bg-purple-900 text-purple-800 dark:text-purple-200 rounded-full text-sm"
                >
                  {interest}
                </span>
              ))}
            </div>
            
            <div className="mt-6">
              <h3 className="text-lg font-bold mb-3">📸 相册</h3>
              <div className="grid grid-cols-3 gap-2">
                {profile.photos.map((photo, index) => (
                  <img
                    key={index}
                    src={photo}
                    alt={`照片 ${index + 1}`}
                    className="w-full h-24 object-cover rounded-lg cursor-pointer hover:opacity-80 transition-opacity"
                  />
                ))}
              </div>
            </div>
            
            <div className="mt-6 flex space-x-3">
              <button className="flex-1 bg-purple-600 text-white py-2 rounded-lg font-medium hover:bg-purple-700 transition-colors">
                编辑资料
              </button>
              <button className="flex-1 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 py-2 rounded-lg font-medium hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors">
                分享主页
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
