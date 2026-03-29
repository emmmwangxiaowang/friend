'use client';

import { useState } from 'react';
import Link from 'next/link';

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

type Comment = {
  id: string;
  author: string;
  avatar: string;
  content: string;
  date: string;
  likes: number;
};

export default function CommunityPostPage({ params }: { params: { id: string } }) {
  const [post] = useState<Post>({
    id: params.id,
    author: '林星',
    avatar: 'https://i.pravatar.cc/150?img=1',
    content: '今天天气不错，来聊聊心动瞬间吧！',
    image: 'https://picsum.photos/800/400?random=1',
    likes: 12,
    comments: 4,
    date: '今天',
    isLiked: false,
  });

  const [comments] = useState<Comment[]>([
    { id: '1', author: '周子安', avatar: 'https://i.pravatar.cc/150?img=2', content: '我也觉得！', date: '10分钟前', likes: 2 },
    { id: '2', author: '姚雨樱', avatar: 'https://i.pravatar.cc/150?img=3', content: '心动瞬间吗？', date: '30分钟前', likes: 1 },
  ]);

  const [newComment, setNewComment] = useState('');
  const [isLiked, setIsLiked] = useState(post.isLiked);
  const [likes, setLikes] = useState(post.likes);

  const handleLike = () => {
    setIsLiked(!isLiked);
    setLikes(isLiked ? likes - 1 : likes + 1);
  };

  const handleAddComment = () => {
    if (newComment.trim() === '') return;
    setNewComment('');
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <header className="sticky top-0 z-10 bg-white dark:bg-gray-800 shadow-sm">
        <div className="max-w-2xl mx-auto px-4 py-3 flex items-center justify-between">
          <Link href="/community" className="text-purple-600 dark:text-purple-400">
            ← 返回
          </Link>
          <h1 className="font-bold">帖子详情</h1>
          <button className="text-gray-500 hover:text-gray-700 dark:hover:text-gray-300">
            •••
          </button>
        </div>
      </header>

      <main className="max-w-2xl mx-auto px-4 py-6">
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm overflow-hidden">
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
                onClick={handleLike}
                className={`flex items-center space-x-1 ${
                  isLiked ? 'text-red-500' : 'text-gray-500 hover:text-red-500'
                } transition-colors`}
              >
                <span>{isLiked ? '❤️' : '🤍'}</span>
                <span className="text-sm">{likes}</span>
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

        <div className="mt-6">
          <h3 className="text-lg font-bold mb-3">评论 ({comments.length})</h3>
          <div className="space-y-4">
            {comments.map(comment => (
              <div key={comment.id} className="flex items-start space-x-3">
                <img
                  src={comment.avatar}
                  alt={comment.author}
                  className="w-8 h-8 rounded-full object-cover"
                />
                <div className="flex-1 bg-white dark:bg-gray-800 rounded-lg p-3 shadow-sm">
                  <div className="flex items-center justify-between">
                    <h4 className="font-bold text-sm">{comment.author}</h4>
                    <p className="text-xs text-gray-500">{comment.date}</p>
                  </div>
                  <p className="text-sm text-gray-700 dark:text-gray-300 mt-1">{comment.content}</p>
                  <button className="flex items-center space-x-1 text-gray-500 hover:text-red-500 transition-colors mt-2">
                    <span>🤍</span>
                    <span className="text-xs">{comment.likes}</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-6 sticky bottom-0 bg-gray-50 dark:bg-gray-900 py-3">
          <div className="flex items-center space-x-3">
            <input
              type="text"
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              placeholder="写下你的评论..."
              className="flex-1 bg-white dark:bg-gray-800 rounded-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500 dark:focus:ring-purple-400 shadow-sm"
            />
            <button
              onClick={handleAddComment}
              disabled={!newComment.trim()}
              className={`p-2 rounded-full transition-colors ${
                newComment.trim()
                  ? 'bg-purple-600 text-white hover:bg-purple-700'
                  : 'bg-gray-200 dark:bg-gray-700 text-gray-400'
              }`}
            >
              ✈️
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}
