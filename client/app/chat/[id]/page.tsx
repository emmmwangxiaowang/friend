'use client';

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import MessageBubble from '../../components/MessageBubble';

type Message = {
  id: string;
  text: string;
  fromMe: boolean;
  date: string;
};

type ChatUser = {
  id: string;
  name: string;
  avatar: string;
  isOnline: boolean;
};

export default function ChatDetail({ params }: { params: { id: string } }) {
  const [messages, setMessages] = useState<Message[]>([
    { id: 'm1', text: '嗨！最近怎么样？', fromMe: false, date: '10:00' },
    { id: 'm2', text: '还不错，你呢？', fromMe: true, date: '10:01' },
    { id: 'm3', text: '最近在忙什么？', fromMe: false, date: '10:02' },
  ]);
  const [newMessage, setNewMessage] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const [chatUser] = useState<ChatUser>({
    id: params.id,
    name: '林星',
    avatar: 'https://i.pravatar.cc/150?img=1',
    isOnline: true,
  });

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = () => {
    if (newMessage.trim() === '') return;

    const newMsg: Message = {
      id: `m${Date.now()}`,
      text: newMessage,
      fromMe: true,
      date: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages([...messages, newMsg]);
    setNewMessage('');
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex flex-col">
      <header className="sticky top-0 z-10 bg-white dark:bg-gray-800 shadow-sm">
        <div className="max-w-2xl mx-auto px-4 py-3 flex items-center justify-between">
          <Link href="/chat" className="text-purple-600 dark:text-purple-400">
            ← 返回
          </Link>
          <div className="flex items-center space-x-3">
            <div className="relative">
              <img
                src={chatUser.avatar}
                alt={chatUser.name}
                className="w-10 h-10 rounded-full object-cover"
              />
              {chatUser.isOnline && (
                <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white dark:border-gray-800" />
              )}
            </div>
            <div>
              <h1 className="font-bold">{chatUser.name}</h1>
              <p className="text-xs text-gray-500">
                {chatUser.isOnline ? '在线' : '离线'}
              </p>
            </div>
          </div>
          <button className="text-gray-500 hover:text-gray-700 dark:hover:text-gray-300">
            •••
          </button>
        </div>
      </header>

      <main className="flex-1 overflow-y-auto max-w-2xl mx-auto w-full px-4 py-6">
        <div className="space-y-4">
          {messages.map(message => (
            <div
              key={message.id}
              className={`flex ${message.fromMe ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-xs md:max-w-md lg:max-w-lg rounded-2xl px-4 py-2 ${
                  message.fromMe
                    ? 'bg-purple-600 text-white'
                    : 'bg-white dark:bg-gray-800 shadow-sm'
                }`}
              >
                <p>{message.text}</p>
                <p
                  className={`text-xs mt-1 ${
                    message.fromMe ? 'text-purple-200' : 'text-gray-500'
                  }`}
                >
                  {message.date}
                </p>
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>
      </main>

      <footer className="sticky bottom-0 bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700">
        <div className="max-w-2xl mx-auto px-4 py-3">
          <div className="flex items-center space-x-3">
            <button className="text-gray-500 hover:text-gray-700 dark:hover:text-gray-300">
              😊
            </button>
            <input
              type="text"
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="输入消息..."
              className="flex-1 bg-gray-100 dark:bg-gray-700 rounded-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500 dark:focus:ring-purple-400"
            />
            <button
              onClick={handleSend}
              disabled={!newMessage.trim()}
              className={`p-2 rounded-full transition-colors ${
                newMessage.trim()
                  ? 'bg-purple-600 text-white hover:bg-purple-700'
                  : 'bg-gray-200 dark:bg-gray-700 text-gray-400'
              }`}
            >
              ✈️
            </button>
          </div>
        </div>
      </footer>
    </div>
  );
}
