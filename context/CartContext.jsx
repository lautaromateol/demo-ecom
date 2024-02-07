"use client";
import { createContext, useState, useEffect, useContext } from "react";
import toast from "react-hot-toast";

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

    const clearCart = ()=> {
        localStorage.removeItem("cartItems")
        setCartItems([])
    }

    const handleCoupon = async(coupon) => {
        try {
            const response = await fetch(`${process.env.API}/stripe/coupon`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ couponCode: coupon })
            })
            if(!response.ok){
                setPercentOff(0)
                setValidCoupon(false)
                toast.error(data.error)
            } else {
                const data = await response.json()
                setPercentOff(data.percent_off)
                setValidCoupon(true)
                toast.success(`${data?.name} applied successfully`)
            }
        } catch (error) {
            console.log(error)
            setPercentOff(0)
            setValidCoupon(false)
            toast.error("An error ocurred. Try again.")
        }
    }

    return (
        <CartContext.Provider value={{
            cartItems,
            addToCart,
            updateQuantity,
            removeFromCart,
            clearCart,
            couponCode,
            setCouponCode,
            handleCoupon,
            percentOff,
            validCoupon
        }}>
            {children}
        </CartContext.Provider>
    )
}

export default CartProvider;