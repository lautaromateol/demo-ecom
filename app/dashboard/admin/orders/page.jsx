"use client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import OrdersList from "@/components/admin/OrdersList";
import toast from "react-hot-toast";

const AdminOrders = () => {

    const router = useRouter()

    const [orders, setOrders] = useState([])

    async function getOrders() {
        try {
            const response = await fetch(`${process.env.API}/admin/orders`)
            const data = await response.json()
            if (response.ok) {
                setOrders(data)
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
                toast.success("Order status updated successfully")
                router.refresh()
            } else {
                const data = await response.json()
                toast.error(data.error)
            }
        } catch (error) {
            console.log(error)
            toast.error("An error ocurred while updating order status")
        }
    }

    useEffect(()=> {
        getOrders()
    }, [])

    return (
        <div className="container">
            <div className="mx-auto">
                <p className="text-2xl font-bold my-10">ORDERS LIST</p>
                <OrdersList orders={orders} handleStatusChange={handleStatusChange} />
            </div>
        </div>
    )
}

export default AdminOrders;