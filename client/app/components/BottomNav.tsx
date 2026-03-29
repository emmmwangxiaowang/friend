"use client";
import React from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

type NavItem = {
  href: string
  label: string
  emoji: string
}

const items: NavItem[] = [
  { href: '/', label: '首页', emoji: '🏠' },
  { href: '/discover', label: '发现', emoji: '🔎' },
  { href: '/chat', label: '聊天', emoji: '💬' },
  { href: '/profile', label: '我的', emoji: '👤' },
]

export default function BottomNav() {
  const path = usePathname()
  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700 md:hidden">
      <div className="flex justify-around text-sm text-gray-700 dark:text-gray-200">
        {items.map((it) => {
          const active = path === it.href
          return (
            <Link key={it.href} href={it.href} className={`flex flex-col items-center justify-center px-4 py-2 w-full ${active ? 'bg-gray-100 dark:bg-gray-800' : ''}`} aria-label={it.label}>
              <span className="text-xl" aria-hidden>{it.emoji}</span>
              <span className={active ? 'font-semibold' : ''}>{it.label}</span>
            </Link>
          )
        })}
      </div>
    </nav>
  )
}
