"use client"
import './globals.css'
import { Inter } from 'next/font/google'
import { Toaster } from 'react-hot-toast'
import { SessionProvider } from 'next-auth/react'
import CategoryProvider from '@/context/CategoryContext'
import TagProvider from '@/context/TagContext'
import ProductProvider from '@/context/ProductContext'
import TopNav from '@/components/nav/TopNav'

const inter = Inter({ subsets: ['latin'] })

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <SessionProvider>
        <CategoryProvider>
          <TagProvider>
            <ProductProvider>
            <body className={inter.className}>
              <TopNav />
              <Toaster />
              {children}
            </body>
            </ProductProvider>
          </TagProvider>
        </CategoryProvider>
      </SessionProvider>
    </html>
  )
}
