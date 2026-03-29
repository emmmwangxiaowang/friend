'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

type NavItem = {
  href: string;
  label: string;
  emoji: string;
};

const items: NavItem[] = [
  { href: '/', label: '首页', emoji: '🏠' },
  { href: '/discover', label: '发现', emoji: '🔎' },
  { href: '/chat', label: '聊天', emoji: '💬' },
  { href: '/community', label: '社区', emoji: '👥' },
  { href: '/profile', label: '我的', emoji: '👤' },
];

export default function BottomNav() {
  const path = usePathname();

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700">
      <div className="max-w-2xl mx-auto flex justify-around">
        {items.map((item) => {
          const isActive = path === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex flex-col items-center justify-center px-4 py-2 w-full transition-colors ${
                isActive
                  ? 'text-purple-600 dark:text-purple-400 bg-purple-50 dark:bg-purple-900/20'
                  : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800'
              }`}
            >
              <span className="text-xl mb-1">{item.emoji}</span>
              <span className={`text-xs ${isActive ? 'font-semibold' : ''}`}>{item.label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
