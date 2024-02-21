"use client";
import { useState, useEffect } from "react";
import { useCartContext } from "@/context/CartContext";
import Link from "next/link";

const AddToCart = ({ product, card, reviewAndCheckout }) => {

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
        addToCart(product, quantity)
    }

    return (
        <>
            {reviewAndCheckout ?
                <div className="w-full">
                    {cartItems.some((item) => item._id === product._id) ? (
                        <div className="flex flex-col">
                            <div className={`px-4 w-full flex space-x-3 justify-center items-center`}>
                                <button onClick={handleDecrement} className="cursor-pointer rounded px-4 py-2 border border-green-700 text-green-700 hover:bg-green-900 hover:text-white"> - </button>
                                <input className="border-b border-green-700 bg-gray-100 text-center text-xs outline-none" type="number" value={quantity} onChange={(e) => setQuantity(parseInt(e.target.value, 10))} />
                                <button onClick={handleIncrement} className="cursor-pointer rounded px-4 py-2 border border-green-700 text-green-700 hover:bg-green-900 hover:text-white"> + </button>
                            </div>
                            <Link className="w-full rounded mt-2 px-4 py-2 border-2 border-green-700 font-bold text-green-700 text-center hover:bg-green-900 hover:text-white" href='/cart'>
                                Review & Checkout
                            </Link>
                        </div>

                    ) : (
                        // <button disabled={selectedEdition.stock === 0} onClick={handleAddToCart} className={`w-full ${selectedEdition.stock > 0 ? "bg-green-700 hover:bg-green-900" : "bg-red-500 cursor-not-allowed"} dark:bg-gray-600 text-white py-2 px-4 rounded-full font-bold dark:hover:bg-gray-700`}>
                        //     {selectedEdition.stock > 0 ? "Add to Cart" : "Out of Stock"}
                        // </button>
                        <button disabled={product.stock === 0} onClick={handleAddToCart} className={`w-full rounded ${product.stock > 0 ? "bg-green-700 hover:bg-green-900" : "bg-red-500 cursor-not-allowed"} text-white py-2 px-4 font-bold`}>
                            {product.stock > 0 ? "Add to Cart" : "Out of Stock"}
                        </button>
                    )}
                </div>
                :
                <div className="flex items-center border-gray-100">
                    <button onClick={handleDecrement} className="cursor-pointer rounded-l bg-gray-100 py-1 px-3.5 duration-100 hover:bg-blue-500 hover:text-blue-50"> - </button>
                    <input className="h-8 w-8 border bg-white text-center text-xs outline-none" type="number" value={quantity} onChange={(e) => setQuantity(parseInt(e.target.value, 10))} />
                    <button onClick={handleIncrement} className="cursor-pointer rounded-r bg-gray-100 py-1 px-3 duration-100 hover:bg-blue-500 hover:text-blue-50"> + </button>
                </div>
            }
        </>

    )
}

export default AddToCart;