"use client";
import { useEffect } from "react";
import { useCartContext } from "@/context/CartContext";
import { useSearchParams } from "next/navigation";


const CouponCode = () => {

    const { handleCoupon, setCouponCode } = useCartContext()

    const searchParams = useSearchParams()

    const code = searchParams.get("couponCode")

    useEffect(() => {
        if (code) {
            setCouponCode(code)
            handleCoupon(code)
        }
    }, [code])

    return (
        <div className="flex space-x-2">
            {/* <h4 className="text-xl">${selectedEdition.price.toFixed(2)}</h4>
            {selectedEdition.previousPrice > selectedEdition.price && (
                <h4 className="text-red-600">
                    <del>${selectedEdition?.previousPrice?.toFixed(2)}</del>
                </h4>
            )} */}
             <h4 className="text-xl">${price.toFixed(2)}</h4>
            {previousPrice && previousPrice > price && (
                <h4 className="text-red-600">
                    <del>${previousPrice.toFixed(2)}</del>
                </h4>
            )}
        </div>
        
    )
}

export default CouponCode;