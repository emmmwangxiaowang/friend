'use client';

import { useState } from 'react';
import PostCard from '../components/PostCard';

type Post = {
  id: string;
  author: string;
  avatar: string;
  content: string;
  image?: string;
  likes: number;
  comments: number;
  date: string;
  isLiked: boolean;
};

const mockPosts: Post[] = [
  { id: '1', author: '林星', avatar: 'https://i.pravatar.cc/150?img=1', content: '今天天气不错，来聊聊心动瞬间吧！', image: 'https://picsum.photos/800/400?random=1', likes: 12, comments: 4, date: '今天', isLiked: false },
  { id: '2', author: '周子安', avatar: 'https://i.pravatar.cc/150?img=2', content: '刚吃完夜宵，脑子里全是旅行的计划。', likes: 8, comments: 2, date: '2小时前', isLiked: true },
  { id: '3', author: '姚雨樱', avatar: 'https://i.pravatar.cc/150?img=3', content: '分享一本好书《小王子》，每次读都有新的感悟。', image: 'https://picsum.photos/800/400?random=3', likes: 24, comments: 8, date: '昨天', isLiked: false },
];

export default function CommunityPage() {
  const [posts, setPosts] = useState<Post[]>(mockPosts);
  const [filter, setFilter] = useState<'latest' | 'hot' | 'following'>('latest');

  const toggleLike = (postId: string) => {
    setPosts(posts.map(post => {
      if (post.id === postId) {
        return {
          ...post,
          isLiked: !post.isLiked,
          likes: post.isLiked ? post.likes - 1 : post.likes + 1,
        };
      }
      return post;
    }));
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <header className="sticky top-0 z-10 bg-white dark:bg-gray-800 shadow-sm">
        <div className="max-w-2xl mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            <h1 className="text-xl font-bold text-purple-600 dark:text-purple-400">社区</h1>
            <button className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
              ➕
            </button>
          </div>
          
          <div className="flex space-x-2 mt-3">
            <button
              onClick={() => setFilter('latest')}
              className={`px-4 py-1 rounded-full text-sm font-medium transition-colors ${
                filter === 'latest'
                  ? 'bg-purple-600 text-white'
                  : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600'
              }`}
            >
              最新
            </button>
            <button
              onClick={() => setFilter('hot')}
              className={`px-4 py-1 rounded-full text-sm font-medium transition-colors ${
                filter === 'hot'
                  ? 'bg-purple-600 text-white'
                  : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600'
              }`}
            >
              热门
            </button>
            <button
              onClick={() => setFilter('following')}
              className={`px-4 py-1 rounded-full text-sm font-medium transition-colors ${
                filter === 'following'
                  ? 'bg-purple-600 text-white'
                  : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600'
              }`}
            >
              关注
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-2xl mx-auto px-4 py-6">
        <div className="space-y-4">
          {posts.map(post => (
            <div
              key={post.id}
              className="bg-white dark:bg-gray-800 rounded-xl shadow-sm overflow-hidden"
            >
              <div className="p-4">
                <div className="flex items-center space-x-3 mb-3">
                  <img
                    src={post.avatar}
                    alt={post.author}
                    className="w-10 h-10 rounded-full object-cover"
                  />
                  <div>
                    <h3 className="font-bold">{post.author}</h3>
                    <p className="text-xs text-gray-500">{post.date}</p>
                  </div>
                </div>
                
                <p className="text-sm text-gray-700 dark:text-gray-300 mb-3">{post.content}</p>
                
                {post.image && (
                  <img
                    src={post.image}
                    alt="post"
                    className="w-full h-48 object-cover rounded-lg mb-3"
                  />
                )}
                
                <div className="flex items-center justify-between pt-3 border-t border-gray-100 dark:border-gray-700">
                  <button
                    onClick={() => toggleLike(post.id)}
                    className={`flex items-center space-x-1 ${
                      post.isLiked ? 'text-red-500' : 'text-gray-500 hover:text-red-500'
                    } transition-colors`}
                  >
                    <span>{post.isLiked ? '❤️' : '🤍'}</span>
                    <span className="text-sm">{post.likes}</span>
                  </button>
                  
                  <button className="flex items-center space-x-1 text-gray-500 hover:text-blue-500 transition-colors">
                    <span>💬</span>
                    <span className="text-sm">{post.comments}</span>
                  </button>
                  
                  <button className="flex items-center space-x-1 text-gray-500 hover:text-green-500 transition-colors">
                    <span>🔄</span>
                    <span className="text-sm">转发</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        {posts.length === 0 && (
          <div className="text-center py-12">
            <div className="text-4xl mb-3">📝</div>
            <p className="text-gray-500">暂无动态</p>
            <button className="mt-4 px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors">
              发布第一条动态
            </button>
          </div>
        )}
      </main>
    </div>
  );
}
