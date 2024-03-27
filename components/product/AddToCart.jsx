"use client";
import { Fragment, useState, useEffect } from "react";
import { useCartContext } from "@/context/CartContext";
import Link from "next/link";

const AddToCart = ({ product, display }) => {

    const { addToCart, updateQuantity, cartItems, removeFromCart, setOpenSlider } = useCartContext()

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
        const newQuantity = quantity + 1
        setQuantity(newQuantity)
        updateQuantity(product, newQuantity)
        addToCart(product, 1)
        setOpenSlider(true)
    }

    return (
        <>
            {display === "productPage" ?
                <button onClick={handleAddToCart} className="w-full bg-main px-4 py-2 text-white transition-all hover:bg-tint">Add to cart</button>
                :
                display === "cartPage" ?
                    <>
                        <div className="flex items-center border-gray-100">
                            <span onClick={handleDecrement} className="cursor-pointer rounded-l bg-gray-100 py-1 px-3.5 duration-100 hover:bg-main hover:text-white"> - </span>
                            <input className="h-8 w-8 border bg-white text-center text-xs outline-none" type="number" value={quantity} />
                            <span onClick={handleIncrement} className="cursor-pointer rounded-r bg-gray-100 py-1 px-3 duration-100 hover:bg-main hover:text-white"> + </span>
                        </div>
                    </>
                    :
                    <button onClick={handleAddToCart} className="text-main font-medium uppercase transition-all hover:border-b border-tint hover:text-tint">Add to cart</button>
            }
        </>

    )
}

export default AddToCart;