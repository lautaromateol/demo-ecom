"use client"
import AddToCart from "../product/AddToCart"
import { useCartContext } from "@/context/CartContext"
import OrderSummary from "./OrderSummary"

const Step1 = ({ handleNextStep }) => {

  const { cartItems } = useCartContext()

  return (
    <div className="container">
      <div className="mx-auto max-w-7xl p-4">
      <p className="bg-shade text-main w-full px-4 py-2">Review Cart Items</p>
        <div className="w-full mt-10">
          <div className="justify-center px-6 md:flex md:space-x-6 xl:px-0">
            {cartItems.map((item) => (
              <div className="rounded-lg md:w-2/3">
                <div className="justify-between mb-6 rounded-lg bg-white p-6 shadow-md sm:flex sm:justify-start">
                  {/* <img src={item.selectedEdition.image.secure_url} alt="product-image" className="w-full rounded-lg sm:w-40" /> */}
                  <img src={item.main_images[0].secure_url} alt="product-image" className="w-full rounded-lg sm:w-40" />
                  <div className="lg:flex items-center justify-center sm:ml-4 sm:flex sm:w-full sm:justify-between">
                    <div className="mt-5 sm:mt-0">
                      <h2 className="text-lg font-bold text-gray-900">{item.title}</h2>
                      {/* <p className="mt-1 text-xs text-gray-700">{item.selectedEdition.console} edition</p> */}
                    </div>
                    <div className="mt-4 flex justify-between sm:space-y-6 sm:mt-0 sm:block sm:space-x-6">
                      <AddToCart product={item} display="cartPage" />
                      <div className="flex items-center space-x-4">
                        {/* <p className="text-lg">${item.selectedEdition.price.toFixed(2)}</p> */}
                        <p className="text-lg">${item.price.toFixed(2)}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
            <OrderSummary handleNextStep={handleNextStep} />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Step1