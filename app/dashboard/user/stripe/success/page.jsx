"use client";
import Link from "next/link"
import { useCartContext } from "@/context/CartContext"
import { useEffect } from "react"

const SuccessfulPayment = () => {

  const { clearCart } = useCartContext()

  useEffect(()=> {
    clearCart()
  }, [])

  return (
    <div className="min-h-screen flex flex-col items-center justify-center">
        <p className="mb-3">Thank for your purchase. You can now check your order status in the dashboard.</p>
        <Link href='/dashboard/user/' className="px-4 py-2 text-white rounded-lg bg-blue-500 hover:bg-blue-800">
            View Order Status
        </Link>
    </div>
  )
}

export default SuccessfulPayment