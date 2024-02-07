"use client";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import toast from "react-hot-toast";

export default function UserOrders() {

    const [orders, setOrders] = useState([])
    
    const [loading, setLoading] = useState(true)

    const router = useRouter()

    async function getOrders() {
        const response = await fetch(`${process.env.API}/user/orders`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        })
        const data = await response.json()
        if (response.ok) {
            setOrders(data)
            setLoading(false)
        } else {
            console.log(error)
        }
    }

    async function handleCancelOrder(orderId) {
        try {
            const response = await fetch(`${process.env.API}/user/orders/refund?orderId=${orderId}`, {
                method: "POST"
            })
            if (response.ok) {
                router.refresh()
            } else {
                toast.error(data.error)
            }
        } catch (error) {
            toast.error("An error has ocurred cancelling the order. Try again.")
        }
    }

    useEffect(() => {
        getOrders()
    })

    return (
        <>
            {loading ?
                <div className="flex items-center justify-center min-h-screen text-red-900">
                    LOADING
                </div> :
                <div className="container mb-5">
                    <div className="grid grid-cols-1">
                        <h4 className="text-center mb-4">Recent Orders</h4>
                        {orders?.map((order) => (
                            <div className="mb-4 p-4 bg-secondary" key={order._id}>
                                <table className="table table-striped w-full">
                                    <tbody>
                                        <tr>
                                            <th scope="row">Charge ID:</th>
                                            <td>{order.chargeId}</td>
                                        </tr>
                                        <tr>
                                            <th scope="row">Created:</th>
                                            <td>{new Date(order.createdAt).toLocaleDateString()}</td>
                                        </tr>
                                        <tr>
                                            <th scope="row">Payment Intent:</th>
                                            <td>{order.payment_intent}</td>
                                        </tr>
                                        <tr>
                                            <th scope="row">Receipt:</th>
                                            <td>
                                                <a className="text-blue-500" target="_blank" href={order.receipt_url}>
                                                    View
                                                </a>
                                            </td>
                                        </tr>
                                        <tr>
                                            <th scope="row">Refunded:</th>
                                            <td>{order.refunded ? "Yes" : "No"}</td>
                                        </tr>
                                        <tr>
                                            <th scope="row">Status:</th>
                                            <td>{order.status}</td>
                                        </tr>
                                        <tr>
                                            <th scope="row">Total Charged:</th>
                                            <td>
                                                ${(order.ammount_captured / 100).toFixed(2)} {order.currency}
                                            </td>
                                        </tr>
                                        <tr>
                                            <th scope="row">Shipping Address:</th>
                                            <td>{order.shipping.address.line1}
                                                <br />
                                                {order?.shipping?.address?.line2 &&
                                                    `${order?.shipping?.address?.line2}, `}
                                                {order?.shipping?.address?.city},{" "}
                                                {order?.shipping?.address?.state},{" "}
                                                {order?.shipping?.address?.postal_code}
                                                <br />
                                                {order?.shipping?.address?.country}
                                            </td>
                                        </tr>
                                        <tr>
                                            <th scope="row" className="w-1/4">Ordered Products:</th>
                                            <td className="w-3/4">
                                                {order.cartItems.map((product) => (
                                                    <div className="cursor-pointer text-blue-500" key={product._id} onClick={() => {
                                                        router.push(`/product/${product.slug}`)
                                                    }}>
                                                        {product.quantity} x {product.title} ${product.price.toFixed(2)} {order.currency}
                                                    </div>
                                                ))}
                                            </td>
                                        </tr>
                                        <tr>
                                            <th scope="row">Delivery Status:</th>
                                            <td>
                                                {order.delivery_status}
                                                {order.delivery_status === "Not Processed" && !order.refunded && (
                                                    <>
                                                        <br />
                                                        <span
                                                            className="text-red-500 cursor-pointer"
                                                            onClick={() => handleCancelOrder(order._id)}
                                                        >
                                                            Cancel the order
                                                        </span>
                                                    </>
                                                )}
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        ))}
                    </div>
                </div>
            }
        </>


    )
}

