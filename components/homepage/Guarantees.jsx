"use client";
import { FaShippingFast, FaLock, FaMoneyBill } from "react-icons/fa";

const Guarantees = () => {
    return (
        <div className="grid place-content-center p-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="flex items-center justify-center space-x-2 px-6 py-2 border border-green-500">
                    <FaShippingFast className="text-4xl text-green-500" />
                    <div className="flex flex-col">
                        <span className="text-sm font-semibold">Free Shipping</span>
                        <span className="text-sm">If you are residing on U.S</span>
                    </div>
                </div>
                <div className="flex items-center justify-center space-x-2 px-6 py-2 border border-green-500">
                    <FaLock className="text-4xl text-green-500" />
                    <div className="flex flex-col">
                        <span className="text-sm font-semibold">Secure Checkout</span>
                        <span className="text-sm">With our gateway Stripe</span>
                    </div>
                </div>
                <div className="flex items-center justify-center space-x-2 px-6 py-2 border border-green-500">
                    <FaMoneyBill className="text-4xl text-green-500" />
                    <div className="flex flex-col">
                        <span className="text-sm font-semibold">Money Returns</span>
                        <span className="text-sm">Within the first 30 days</span>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Guarantees