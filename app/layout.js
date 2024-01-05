"use client"
import './globals.css'
import { Inter } from 'next/font/google'
import { Toaster } from 'react-hot-toast'
import { SessionProvider } from 'next-auth/react'
import CategoryProvider from '@/context/CategoryContext'
import TagProvider from '@/context/TagContext'
import TopNav from '@/components/nav/TopNav'

const inter = Inter({ subsets: ['latin'] })

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <SessionProvider>
        <CategoryProvider>
          <TagProvider>
            <body className={inter.className}>
              <TopNav />
              <Toaster />
              {children}
            </body>
          </TagProvider>
        </CategoryProvider>
      </SessionProvider>
    </html>
  )
}
