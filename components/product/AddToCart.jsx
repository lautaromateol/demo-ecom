"use client"
import { useState, useEffect } from "react";
import { useCartContext } from "@/context/CartContext";
import Link from "next/link";

const AddToCart = ({ product, selectedEdition, reviewAndCheckout }) => {

    const { addToCart, updateQuantity, cartItems, removeFromCart } = useCartContext()

    const existingProduct = cartItems?.find((item) => item._id === product?._id)

    const initialQuantity = existingProduct ? existingProduct.quantity : 1

    const [quantity, setQuantity] = useState(initialQuantity)

    useEffect(() => {
        setQuantity(existingProduct ? existingProduct.quantity : 1)
    }, [existingProduct])

    const handleIncrement = () => {
        const newQuantity = quantity + 1
        setQuantity(newQuantity)
        updateQuantity(product, newQuantity)
    }

    const handleDecrement = () => {
        if (quantity > 1) {
            const newQuantity = quantity - 1
            setQuantity(newQuantity)
            updateQuantity(product, newQuantity)
        } else {
            removeFromCart(product._id)
            setQuantity(1)
        }
    }

    const handleAddToCart = () => {
        addToCart(product, selectedEdition, quantity)
    }

    return (
        <>
            {reviewAndCheckout ?
                <div className="w-1/2">
                    {cartItems.some((item) => item._id === product._id) ? (
                        <div className="flex flex-col">
                            <div className={`px-4 py-2 bg-green-700 rounded-full w-full flex justify-center items-center`}>
                                <button className={`text-white text-xl font-bold mx-4`} type="button" onClick={handleDecrement}>
                                    -
                                </button>
                                <input className={`rounded-full text-center w-2/5 outline-none`} type="number" value={quantity} onChange={(e) => setQuantity(parseInt(e.target.value, 10))} />
                                <button className={`text-white text-xl font-bold mx-4`} type="button" onClick={handleIncrement}>
                                    +
                                </button>
                            </div>
                            <Link className="w-full mt-2 px-4 py-2 bg-gray-900 border-2 font-bold text-white text-center rounded-full" href='/cart'>
                                Review & Checkout
                            </Link>
                        </div>

                    ) : (
                        <button onClick={handleAddToCart} className="w-full bg-green-700 dark:bg-gray-600 text-white py-2 px-4 rounded-full font-bold hover:bg-green-900 dark:hover:bg-gray-700">Add to Cart</button>
                    )}
                </div>
                :
                <div className="w-full flex justify-between">
                    <button className="border border-green-700 text-green-700 px-4 py-2" type="button" onClick={handleDecrement}>
                        -
                    </button>
                    <input className="w-2/3 border-b border-green-700 outline-none text-center" type="number" value={quantity} onChange={(e) => setQuantity(parseInt(e.target.value, 10))} />
                    <button className="border border-green-700 text-green-700 px-4 py-2" type="button" onClick={handleIncrement}>
                        +
                    </button>
                </div>
            }
        </>

    )
}

export default AddToCart;