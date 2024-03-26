"use client";
import { useState, useEffect } from "react";
import { useCartContext } from "@/context/CartContext";
import Link from "next/link";

const AddToCart = ({ product, display }) => {

    const { addToCart, updateQuantity, cartItems, removeFromCart } = useCartContext()

    const existingProduct = cartItems?.find((item) => item._id === product?._id)

    const initialQuantity = existingProduct ? existingProduct.quantity : 1

    const [quantity, setQuantity] = useState(initialQuantity)

    useEffect(() => {
        setQuantity(existingProduct ? existingProduct.quantity : 1)
    }, [existingProduct])

    // const handleIncrement = () => {
    //     const newQuantity = quantity + 1
    //     setQuantity(newQuantity)
    //     updateQuantity(product, newQuantity)
    // }

    // const handleDecrement = () => {
    //     if (quantity > 1) {
    //         const newQuantity = quantity - 1
    //         setQuantity(newQuantity)
    //         updateQuantity(product, newQuantity)
    //     } else {
    //         removeFromCart(product._id)
    //         setQuantity(1)
    //     }
    // }

    const handleAddToCart = () => {
        addToCart(product, quantity)
    }

    return (
        <>
            {display === "productPage" ?
                <>
                    <label className="block uppercase text-primary mb-2" htmlFor="quantity">Quantity</label>
                    <input min={1} onChange={(e) => setQuantity(parseInt(e.target.value, 10))} value={quantity} className="px-4 py-2 border border-secondary focus:outline-none mb-6" type="number" id="quantity" />
                    <button onClick={handleAddToCart} className="w-full bg-main px-4 py-2 text-white transition-all hover:bg-tint">Add to cart</button>
                </>
                :
                <>
                    <button className="text-main font-medium uppercase transition-all hover:border-b border-tint hover:text-tint">Add to cart
                    </button>
                </>
            }
        </>

    )
}

export default AddToCart;