import { useCartContext } from "@/context/CartContext";

const OrderSummary = ({handleNextStep}) => {

    const { cartItems } = useCartContext()

    const calculateTotal = () => {
        return cartItems.reduce(
            (total, item) => total + item.price * item.quantity, 0
        )
    }

    return (
        <div className="mt-6 h-full rounded-lg border bg-white p-6 shadow-md md:mt-0 md:w-1/3">
            <div className="mb-2 flex justify-between">
                <p className="text-gray-700">Subtotal</p>
                <p className="text-gray-700">${calculateTotal().toFixed(2)}</p>
            </div>
            <div className="mb-2 flex justify-between">
                <p className="text-gray-700">Shipping</p>
                <p className="text-gray-700">$5.00</p>
            </div>
            <div className="flex justify-between">
                <p className="text-gray-700">VAT</p>
                <p className="text-gray-700">${((calculateTotal() * (0,10)) / 100).toFixed(2)}</p>
            </div>
            <hr className="my-4" />
            <div className="flex justify-between">
                <p className="text-lg font-bold">Total</p>
                <div>
                    <p className="mb-1 text-lg font-bold">${(calculateTotal() + (calculateTotal() * (0,10) / 100) + 5).toFixed(2)}</p>
                </div>
            </div>
            <button onClick={handleNextStep} className="mt-6 w-full rounded-md bg-blue-500 py-1.5 font-medium text-blue-50 hover:bg-blue-600">Check out</button>
        </div>
    )
}

export default OrderSummary