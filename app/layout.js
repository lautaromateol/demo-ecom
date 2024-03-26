"use client";
import './globals.css';
import { Toaster } from 'react-hot-toast';
import { Roboto } from 'next/font/google';
import { SessionProvider } from 'next-auth/react';
import Footer from '@/components/footer/Footer';
import CategoryProvider from '@/context/CategoryContext';
import TagProvider from '@/context/TagContext';
import ProductProvider from '@/context/ProductContext';
import CartProvider from '@/context/CartContext';
import TopNav from '@/components/nav/TopNav';

const roboto = Roboto({
  weight: ['300','400', '500', '700', '900'],
  style: ['normal', 'italic'],
  subsets: ['latin'],
  display: 'swap',
})

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
                  <body className={roboto.className}>
                    <TopNav/>
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
