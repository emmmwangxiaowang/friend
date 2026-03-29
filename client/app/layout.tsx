import React from 'react'
import BottomNav from './components/BottomNav'
import './globals.css'

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="zh-CN" className="dark">
      <head />
      <body className="min-h-screen bg-white text-gray-900 dark:bg-gray-900 dark:text-white">
        <div className="min-h-screen pb-20">{children}</div>
        {/* Global bottom navigation (mobile-first) */}
        <BottomNav />
      </body>
    </html>
  )
}
