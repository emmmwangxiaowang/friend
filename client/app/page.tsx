'use client';

import { useState } from 'react';
import SearchBar from './components/SearchBar';
import HotTopics from './components/HotTopics';
import UserRecommendations from './components/UserRecommendations';
import HeroBanner from './components/HeroBanner';
import PostCard from './components/PostCard';
import { fetchPosts } from '../lib/api';

type Post = {
  id: string;
  author: string;
  content: string;
  image?: string;
  likes?: number;
  comments?: number;
  date?: string;
};

export default function HomePage() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);

  useState(() => {
    fetchPosts().then((data) => {
      setPosts(data as Post[]);
      setLoading(false);
    });
  });

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <header className="sticky top-0 z-10 bg-white dark:bg-gray-800 shadow-sm">
        <div className="max-w-2xl mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            <h1 className="text-xl font-bold text-purple-600 dark:text-purple-400">SoulMate</h1>
            <SearchBar />
          </div>
        </div>
      </header>

      <main className="max-w-2xl mx-auto px-4 py-6">
        <HeroBanner />
        <HotTopics />
        <UserRecommendations />

        <div className="mb-6">
          <div className="flex justify-between items-center mb-3">
            <h3 className="text-lg font-bold">📝 最新动态</h3>
            <button className="text-purple-600 dark:text-purple-400 text-sm hover:underline">查看更多</button>
          </div>
          {loading ? (
            <div className="text-center py-8 text-gray-500">加载中...</div>
          ) : posts.length > 0 ? (
            <div className="space-y-4">
              {posts.map((post) => (
                <PostCard key={post.id} post={post} />
              ))}
            </div>
          ) : (
            <div className="text-center py-8 text-gray-500">暂无动态，快来发布第一条吧！</div>
          )}
        </div>
      </main>
    </div>
  );
}
