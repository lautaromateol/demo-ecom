"use client";
import { useSession } from "next-auth/react";
import Link from "next/link";
import OrderSummary from "./OrderSummary";

const Step2 = ({ handlePrevStep, handleNextStep }) => {

  const { data, status, update } = useSession()

  if (status !== "authenticated") {
    return (
      <div className="container mt-10">
        <div className="max-w-3xl mx-auto">
          <div className="flex">
            <button onClick={handlePrevStep} className="w-1/2 px-4 py-2 border-2 border-green-700 text-green-700">
              Previous
            </button>
            <Link className="w-1/2 px-4 py-2 bg-blue-500 text-white text-center" href={`/login?callbackUrl=${window.location.href}`}>
              Login to Continue
            </Link>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="container flex items-center justify-center mt-10">
      <div className="max-w-7xl flex space-x-4">
        <div className="w-3/4">
          <p className="bg-indigo-100 text-blue-600 w-full px-4 py-2">
            Contact Details / Login
          </p>
          <div>
            <input type="text"
              className="w-full px-4 py-2 bg-gray-100 mt-4"
              value={data.user.name}
              disabled />
            <input type="text"
              className="w-full px-4 py-2 bg-gray-100 mt-4"
              value={data.user.email}
              disabled />
            <input type="text"
              className="w-full outline-none border-b-2 focus:border-blue-600 px-4 py-2 mt-4"
              placeholder="Enter your coupon code here"
            />
            <button className="px-4 py-2 mt-4 bg-green-700 text-white">
              APPLY COUPON
            </button>
          </div>
          <div className="mt-4">
            <button onClick={handlePrevStep} className="w-1/2 px-4 py-2 border-2 border-green-700 text-green-700">
              Previous
            </button>
            <button onClick={handleNextStep} className="w-1/2 px-4 py-2 bg-blue-500 border-2 border-blue-500 text-white text-center" href={`/login?callbackUrl=${window.location.href}`}>
              Next
            </button>
          </div>
        </div>
        <div className="w-1/4">
          <OrderSummary/>
        </div>
      </div>
    </div>
  )
}

export default Step2