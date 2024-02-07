"use client"
import Link from "next/link"
import AddToCart from "../product/AddToCart"
import { useCartContext } from "@/context/CartContext"
import OrderSummary from "./OrderSummary"

const Step1 = ({ handleNextStep }) => {

  const { cartItems } = useCartContext()

  console.log(cartItems)

  return (
    <div className="container flex justify-center items-center mt-10">
      <div className="max-w-7xl flex space-x-4">
        <div className="w-3/4">
          <p className="bg-indigo-100 text-blue-600 w-full px-4 py-2">Review Cart / Adjust Quantity</p>
          {cartItems.map((item) => (
            <div className="my-5 shadow-lg rounded-md" key={item._id}>
              <div className="flex justify-center items-center">
                <div className="w-1/3 heigth-20 overflow-hidden p-4">
                  <img alt={item.title} className="w-full h-full object-contain" src={item.selectedEdition.image.secure_url} />
                </div>
                <div className="p-4">
                  <h5 className="text-3xl text-blue-500">
                    <Link href={`/product/${item.slug}`}
                      as={`/product/${item.slug}`}>
                      {`${item.title} - ${item.selectedEdition.console} edition`}
                    </Link>
                  </h5>
                  <h4 className="mt-2 text-2xl">${item.selectedEdition.price.toFixed(2)}</h4>
                  <div className="mt-2">
                    {item.description.length > 160 ? `${item.description.substring(0, 160)}...` : item.description}
                  </div>
                  <div className="mt-2 w-full">
                    <AddToCart product={item} reviewAndCheckout={false} />
                  </div>
                </div>
              </div>
            </div>
          ))}
          <div>
            <button onClick={handleNextStep} className="px-4 py-2 bg-green-700 text-white font-bold w-full">
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

export default Step1