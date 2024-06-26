"use client";
import { useState } from "react";
import { useCartContext } from "@/context/CartContext";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import Image from "next/image";

export default function TopNav() {

  const { cartItems } = useCartContext();

  const { data, status } = useSession()

  const [displayMenu, setDisplayMenu] = useState(false)

  return (
    <header className="relative w-full top-0 left-0 flex items-center justify-between py-0 px-8 h-24 mb-8">
      <Link href="/">
        <Image src="/img/logo.png" alt="logo" width={112} height={120} />
      </Link>
      <nav>
        <ul className="hidden md:flex items-center justify-center gap-6 uppercase text-main font-light">
          {
            status === "authenticated" ?
            <>
              <li>
                <Link href="/dashboard/user">
                  {data?.user?.name}
                </Link>
              </li>
              <li className="cursor-pointer" onClick={() => signOut({ callbackUrl: "/" })}>
                Sign Out
              </li>
            </>
              :
              <>
                <li>
                  <Link href="/login">
                    Sign in
                  </Link>
                </li>
                <li>
                  <Link href="/register">
                    Register
                  </Link>
                </li>
              </>
          }
          <li>
            <Link href="/cart">
              Cart ({cartItems?.length})
            </Link>
          </li>
        </ul>
      </nav>

      {/* MOBILE MENU */}
      <nav className={`${displayMenu ? "opacity-100 flex" : "opacity-0 hidden"} md:hidden justify-center absolute top-0 left-0 w-full min-h-screen bg-white transition-all`}>
        <ul className="flex flex-col items-center justify-center gap-8 uppercase text-xl text-main font-light">
          {
            status === "authenticated" ?
            <>
              <li>
                <Link href="/dashboard/user">
                  {data?.user?.name}
                </Link>
              </li>
              <li className="cursor-pointer" onClick={() => signOut({ callbackUrl: "/" })}>
                Sign Out
              </li>
            </>
              :
              <>
                <li>
                  <Link href="/login">
                    Sign in
                  </Link>
                </li>
                <li>
                  <Link href="/register">
                    Register
                  </Link>
                </li>
              </>
          }
          <li onClick={() => setDisplayMenu(false)}>
            <Link href="/cart">
              Cart ({cartItems?.length})
            </Link>
          </li>
        </ul>
      </nav>
      <button className="md:hidden z-10">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" onClick={() => setDisplayMenu(true)} className={`${displayMenu ? "hidden" : "block"} w-6 h-6 text-main`}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
        </svg>
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" onClick={() => setDisplayMenu(false)} className={`${displayMenu ? "block" : "hidden"} w-6 h-6 text-main`}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
        </svg>

      </button>
    </header>
  )
}
