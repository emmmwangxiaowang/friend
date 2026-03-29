'use client';

import { useState } from 'react';

type Topic = {
  id: string;
  title: string;
  count: number;
  emoji: string;
};

const mockTopics: Topic[] = [
  { id: '1', title: '单身日记', count: 128, emoji: '💔' },
  { id: '2', title: '恋爱技巧', count: 98, emoji: '💕' },
  { id: '3', title: '相亲经验', count: 76, emoji: '💑' },
  { id: '4', title: '情感分析', count: 54, emoji: '💭' },
  { id: '5', title: '旅行约伴', count: 42, emoji: '✈️' },
];

export default function HotTopics() {
  const [topics] = useState<Topic[]>(mockTopics);

  return (
    <div className="mb-6">
      <h3 className="text-lg font-bold mb-3 px-4">🔥 热门话题</h3>
      <div className="flex overflow-x-auto px-4 space-x-3 pb-2">
        {topics.map((topic) => (
          <div
            key={topic.id}
            className="flex-shrink-0 flex items-center space-x-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-full px-4 py-2 cursor-pointer hover:shadow-lg transition-shadow"
          >
            <span className="text-lg">{topic.emoji}</span>
            <span className="font-medium">#{topic.title}</span>
            <span className="text-xs opacity-80">{topic.count}讨论</span>
          </div>
        ))}
      </div>
    </div>
  );
}
