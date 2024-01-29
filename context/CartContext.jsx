"use client";
import { createContext, useState, useEffect, useContext } from "react";

export const CartContext = createContext()

export const useCartContext = () => useContext(CartContext)

const CartProvider = ({ children }) => {

    const [cartItems, setCartItems] = useState([])

    const [couponCode, setCouponCode] = useState("")
    
    const [percentOff, setPercentOff] = useState(0)

    const [validCoupon, setValidCoupon] = useState(false)

    useEffect(() => {
        const storedCartItems = JSON.parse(localStorage.getItem("cartItems")) || []
        setCartItems(storedCartItems)
    }, [])

    useEffect(() => {
        localStorage.setItem("cartItems", JSON.stringify(cartItems))
    }, [cartItems])

    const addToCart = (product, selectedEdition, quantity) => {
        const existingProduct = cartItems?.find((item) => item._id === product._id)

        if (existingProduct) {
            const updatedCartItems = cartItems.map((item) =>
                item._id === product._id ?
                    { ...item, quantity: item.quantity + quantity } :
                    item
            )
            setCartItems(updatedCartItems)
        } else {
            setCartItems([...cartItems, { ...product, selectedEdition, quantity }])
        }
    }

    const updateQuantity = (product, quantity) => {
        const updatedItems = cartItems.map((item) =>
            item._id === product._id ? { ...item, quantity }
                : item
        )
        setCartItems(updatedItems)
        localStorage.setItem("cartItems", JSON.stringify(updatedItems))
    }

    const removeFromCart = (productId) => {
        const updatedCartItems = cartItems.filter((item) =>
            item._id !== productId
        )
        setCartItems(updatedCartItems)
        if (typeof window !== "undefined") localStorage.setItem("cart", JSON.stringify(updatedCartItems))
    }

    const 

    return (
        <CartContext.Provider value={{
            cartItems,
            addToCart,
            updateQuantity,
            removeFromCart
        }}>
            {children}
        </CartContext.Provider>
    )
}

export default CartProvider;