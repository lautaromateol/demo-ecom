"use client";
import './globals.css';
import { Inter } from 'next/font/google';
import { Toaster } from 'react-hot-toast';
import { SessionProvider } from 'next-auth/react';
import TopNav from '@/components/nav/TopNav';
import Footer from '@/components/footer/Footer';
import CategoryProvider from '@/context/CategoryContext';
import TagProvider from '@/context/TagContext';
import ProductProvider from '@/context/ProductContext';
import CartProvider from '@/context/CartContext';

const inter = Inter({ subsets: ['latin'] })

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <title>SupEcom</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </head>
      <SessionProvider>
        <CategoryProvider>
          <TagProvider>
            <ProductProvider>
                <CartProvider>
                  <body className={inter.className}>
                    <TopNav />
                    <Toaster />
                    {children}
                    <Footer/>
                  </body>
                </CartProvider>
            </ProductProvider>
          </TagProvider>
        </CategoryProvider>
      </SessionProvider>
    </html>
  )
}
