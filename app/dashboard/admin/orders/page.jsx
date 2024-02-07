"use client";
import { useEffect, useState } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import Pagination from "@/components/product/Pagination";
import toast from "react-hot-toast";

const AdminOrders = () => {

    const [orders, setOrders] = useState([])

    const [loading, setLoading] = useState(true)

    const [currentPage, setCurrentPage] = useState(1)
    const [totalPages, setTotalPages] = useState(1)

    const pathname = usePathname()
    const searchParams = useSearchParams()
    const page = searchParams.get("page")

    const getOrders = async (page) => {
        try {
            const response = await fetch(`${process.env.API}/admin/orders?page=${page}`)
            const data = await response.json()
            if (response.ok) {
                setOrders(data.orders)
                setCurrentPage(data.currentPage)
                setTotalPages(data.totalPages)
                setLoading(false)
            } else toast.error(data.error)
        } catch (error) {
            console.log(error)
            toast.error("An error has ocurred fetching the orders")
        }
    }

    const handleStatusChange = async (newStatus, orderId) => {
        try {
            const response = await fetch(`${process.env.API}/admin/orders/${orderId}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ delivery_status: newStatus })
            })
            if (response.ok) {
                setOrders((prevOrders) =>
                    prevOrders.map((order) =>
                        order._id === orderId ? { ...order, delivery_status: newStatus } : order
                    ))
                toast.success("Order status updated successfully")
            } else {
                const data = await response.json()
                toast.error(data.error)
            }
        } catch (error) {
            console.log(error)
            toast.error("An error ocurred while updating order status")
        }
    }

    useEffect(() => {
        getOrders(page)
    }, [])

    return (
        <>
            {loading ?
                <div className="flex items-center justify-center min-h-screen text-red-900">
                    LOADING
                </div> :
                <div className="container mb-5">
                    <div className="grid grid-cols-1">
                        {orders?.map((order) => (
                            <div key={order?._id} className="mb-4 p-4 bg-secondary">
                                <table className="table w-full">
                                    <tbody>
                                        {/* order info */}
                                        <tr>
                                            <th className="w-1/4">Customer Name:</th>
                                            <td className="w-3/4">{order?.userId?.name}</td>
                                        </tr>
                                        <tr>
                                            <th className="w-1/4">Charge ID:</th>
                                            <td className="w-3/4">{order?.chargeId}</td>
                                        </tr>
                                        <tr>
                                            <th className="w-1/4">Created:</th>
                                            <td className="w-3/4">{new Date(order?.createdAt).toLocaleDateString()}</td>
                                        </tr>
                                        <tr>
                                            <th className="w-1/4">Payment Intent:</th>
                                            <td className="w-3/4">{order?.payment_intent}</td>
                                        </tr>
                                        <tr>
                                            <th className="w-1/4">Receipt:</th>
                                            <td className="w-3/4">
                                                <a href={order?.receipt_url} target="_blank" className="text-blue-500">
                                                    View
                                                </a>
                                            </td>
                                        </tr>
                                        <tr>
                                            <th className="w-1/4">Refunded:</th>
                                            <td className="w-3/4">{order?.refunded ? "Yes" : "No"}</td>
                                        </tr>
                                        <tr>
                                            <th className="w-1/4">Status:</th>
                                            <td className="w-3/4">{order?.status}</td>
                                        </tr>
                                        <tr>
                                            <th className="w-1/4">Total Charged:</th>
                                            <td className="w-3/4">
                                                ${(order?.amount_captured / 100)?.toFixed(2)} {order?.currency}
                                            </td>
                                        </tr>
                                        <tr>
                                            <th className="w-1/4">Shipping Address:</th>
                                            <td className="w-3/4">
                                                {order?.shipping?.address?.line1}
                                                <br />
                                                {order?.shipping?.address?.line2 &&
                                                    `${order?.shipping?.address?.line2}, `}
                                                {order?.shipping?.address?.city}, {order?.shipping?.address?.state} {order?.shipping?.address?.postal_code}
                                                <br />
                                                {order?.shipping?.address?.country}
                                            </td>
                                        </tr>
                                        {/* products info */}
                                        <tr>
                                            <th className="w-1/4">Ordered Products:</th>
                                            <td className="w-3/4">
                                                {order?.cartItems?.map((product) => (
                                                    <div
                                                        key={product._id}
                                                        onClick={() => router.push(`/product/${product?.slug}`)}
                                                        className="cursor-pointer text-blue-500"
                                                    >
                                                        {product?.quantity} x {product?.title} $
                                                        {product?.price?.toFixed(2)} {order?.currency}
                                                    </div>
                                                ))}
                                            </td>
                                        </tr>
                                        <tr>
                                            <th className="w-1/4">Delivery Status:</th>
                                            <td className="w-3/4">
                                                <select
                                                    className="form-select"
                                                    onChange={(e) => handleStatusChange(e.target.value, order._id)}
                                                    value={order?.delivery_status}
                                                    disabled={order?.refunded}
                                                >
                                                    <option value="Not Processed">Not Processed</option>
                                                    <option value="processing">Processing</option>
                                                    <option value="Dispatched">Dispatched</option>
                                                    {order?.refunded && (
                                                        <option value="Cancelled">Cancelled</option>
                                                    )}
                                                    <option value="Delivered">Delivered</option>
                                                </select>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        ))}
                    </div>
                    <Pagination
                        currentPage={currentPage}
                        totalPages={totalPages}
                        pathname={pathname}
                    />
                </div>
            }
        </>
    )
}

export default AdminOrders;