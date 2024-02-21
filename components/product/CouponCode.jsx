// "use client";
// import { useEffect } from "react";
// import { useCartContext } from "@/context/CartContext";
// import { useSearchParams } from "next/navigation";


// const CouponCode = () => {

//     const { handleCoupon, setCouponCode } = useCartContext()

//     const searchParams = useSearchParams()

//     const code = searchParams.get("couponCode")

//     useEffect(() => {
//         if (code) {
//             setCouponCode(code)
//             handleCoupon(code)
//         }
//     }, [code])

//     return (
       

//     )
// }

// export default CouponCode;