"use client";
import { useState } from "react";
import { useCartContext } from "@/context/CartContext";
import toast from "react-hot-toast";
import OrderSummary from "./OrderSummary";

const Step3 = ({ handlePrevStep }) => {

  const { cartItems, validCoupon, couponCode } = useCartContext()

  const [loading, setLoading] = useState(false)

  const handleClick = async () => {
    try {
      setLoading(true)
      let payload = {}
      const cartData = cartItems?.map((item) => (
        {
          id: item._id,
          title: item.title,
          quantity: item.quantity,
          selectedEdition: item.selectedEdition
        }
      ))
      payload.cartItems = cartData
      if (validCoupon) {
        payload.couponCode = couponCode
      }
      const response = await fetch(`${process.env.API}/user/product/stripe/session`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(payload)
      })
      const data = await response.json()
      if (response.ok) {
        window.location.href = data.url
      } else {
        toast.error(data.error)
        setLoading(false)
      }
    } catch (error) {
      console.log(error)
      toast.error("An error has ocurred processing the payment. Try again.")
      setLoading(false)
    }
  }

  return (
    <div className="container flex items-center justify-center px-4 mt-10">
      <div className="max-w-7xl flex space-x-4">
        <div className="w-full">
          <p className="bg-indigo-100 text-blue-600 w-full px-4 py-2">Payment Method</p>
          <p className="px-4 py-2 bg-gray-400 mt-4 text-white">
            Clicking 'Place Order' will securely redirect you to our trusted payment partner, Stripe to complete your checkout. Your payment information is fully protected and encrypted for your security.
          </p>
          <div className="flex mt-4">
            <button onClick={handlePrevStep} className="w-1/2 px-4 py-2 border-2 border-green-700 text-green-700">
              Previous
            </button>
            <button disabled={loading} onClick={handleClick} className="w-1/2 px-4 py-2 bg-blue-500 border-2 border-blue-500 text-white text-center" href={`/login?callbackUrl=${window.location.href}`}>
              {loading ? "Processing" : "Place Order"}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Step3