"use client";
import { useState } from "react";
import { useCartContext } from "@/context/CartContext";
import { GoCheckCircleFill } from "react-icons/go"
import Link from "next/link";
import Step1 from "@/components/cart/Step1";
import Step2 from "@/components/cart/Step2";
import Step3 from "@/components/cart/Step3";


const Cart = () => {

    const {cartItems} = useCartContext()

    const [step, setStep] = useState(1)

    const handleNextStep = ()=> {
        setStep(step + 1)
    }

    const handlePrevStep = ()=> {
        setStep(step - 1)
    }

    const checkIcon = (stepNum) => {
        if(step === stepNum) return <GoCheckCircleFill/>
    }

    if(!cartItems.length){
        return(
            <div className="min-h-screen flex items-center justify-center">
                <div className="flex flex-col items-center justify-center">
                    <p className="text-2xl mb-5">Your cart is empty!</p>
                    <Link href='/shop' className="px-4 py-2 bg-green-700 rounded-md text-white font-bold">
                        CONTINUE SHOPPING
                    </Link>
                </div>
            </div>
        )
    }

    return (
        <div className="container">
            <div className="max-w-4xl mx-auto mt-10 flex justify-between">
                <div className="flex items-center">{checkIcon(1)} Review Cart</div>
                <div className="flex items-center">{checkIcon(2)} Contact Details</div>
                <div className="flex items-center">{checkIcon(3)} Payment</div>
            </div>
            {step === 1  && <Step1 handleNextStep={handleNextStep}/>}
            {step === 2  && <Step2 handlePrevStep={handlePrevStep} handleNextStep={handleNextStep}/>}
            {step === 3  && <Step3 handlePrevStep={handlePrevStep}/>}
        </div>
  )
}

export default Cart;