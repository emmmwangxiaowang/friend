'use client';

import { useState } from 'react';
import Link from 'next/link';

type Chat = {
  id: string;
  title: string;
  avatar: string;
  lastMessage: string;
  unread: number;
  time: string;
  isOnline: boolean;
};

const mockChats: Chat[] = [
  { id: '1', title: '林星', avatar: 'https://i.pravatar.cc/150?img=1', lastMessage: '明天一起去看展览?', unread: 2, time: '刚刚', isOnline: true },
  { id: '2', title: '周子安', avatar: 'https://i.pravatar.cc/150?img=2', lastMessage: '收到你的消息啦！', unread: 0, time: '5分钟前', isOnline: false },
  { id: '3', title: '姚雨樱', avatar: 'https://i.pravatar.cc/150?img=3', lastMessage: '最近在看什么书?', unread: 1, time: '1小时前', isOnline: true },
  { id: '4', title: '系统通知', avatar: 'https://i.pravatar.cc/150?img=10', lastMessage: '你的资料审核已通过', unread: 0, time: '昨天', isOnline: false },
];

export default function ChatsPage() {
  const [chats] = useState<Chat[]>(mockChats);
  const [filter, setFilter] = useState<'all' | 'unread'>('all');

  const filteredChats = chats.filter(chat => {
    if (filter === 'unread') return chat.unread > 0;
    return true;
  });

  const totalUnread = chats.reduce((sum, chat) => sum + chat.unread, 0);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <header className="sticky top-0 z-10 bg-white dark:bg-gray-800 shadow-sm">
        <div className="max-w-2xl mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-xl font-bold text-purple-600 dark:text-purple-400">聊天</h1>
              {totalUnread > 0 && (
                <span className="text-xs text-gray-500">{totalUnread}条未读消息</span>
              )}
            </div>
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
              onClick={() => setFilter('unread')}
              className={`px-4 py-1 rounded-full text-sm font-medium transition-colors ${
                filter === 'unread'
                  ? 'bg-purple-600 text-white'
                  : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600'
              }`}
            >
              未读 {totalUnread > 0 && `(${totalUnread})`}
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-2xl mx-auto px-4 py-6">
        <div className="space-y-2">
          {filteredChats.map(chat => (
            <Link
              key={chat.id}
              href={`/chat/${chat.id}`}
              className="block bg-white dark:bg-gray-800 rounded-xl shadow-sm overflow-hidden hover:shadow-md transition-shadow"
            >
              <div className="p-4">
                <div className="flex items-center space-x-4">
                  <div className="relative">
                    <img
                      src={chat.avatar}
                      alt={chat.title}
                      className="w-14 h-14 rounded-full object-cover"
                    />
                    {chat.isOnline && (
                      <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white dark:border-gray-800" />
                    )}
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <h3 className="font-bold truncate">{chat.title}</h3>
                      <span className="text-xs text-gray-500 dark:text-gray-400">{chat.time}</span>
                    </div>
                    <p className="text-sm text-gray-600 dark:text-gray-300 truncate mt-1">{chat.lastMessage}</p>
                  </div>
                  
                  {chat.unread > 0 && (
                    <div className="bg-red-500 text-white text-xs rounded-full px-2 py-1 min-w-[20px] text-center">
                      {chat.unread}
                    </div>
                  )}
                </div>
              </div>
            </Link>
          ))}
        </div>
        
        {filteredChats.length === 0 && (
          <div className="text-center py-12">
            <div className="text-4xl mb-3">💬</div>
            <p className="text-gray-500">没有聊天记录</p>
            <button className="mt-4 px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors">
              开始聊天
            </button>
          </div>
        )}
      </main>
    </div>
  );
}
