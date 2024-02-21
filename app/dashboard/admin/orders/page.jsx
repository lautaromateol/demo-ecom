"use client";
import { useEffect, useState } from "react";
import { FaExclamation, FaTruckLoading, FaRegWindowClose, FaCheck, FaShippingFast, FaReceipt, FaDollarSign } from "react-icons/fa";
import { FaArrowsRotate } from "react-icons/fa6";
import OrdersList from "@/components/admin/OrdersList";
import CardDataStats from "@/components/admin/CartDataStats";
import toast from "react-hot-toast";

const AdminOrders = () => {

    const [orders, setOrders] = useState([])
    const [statusObj, setStatusObj] = useState({})
    const [shippingCost, setShippingCost] = useState(0)
    const [taxesAmount, setTaxesAmount] = useState(0)

    const [loading, setLoading] = useState(true)

    async function getOrders() {
        try {
            const response = await fetch(`${process.env.API}/admin/orders`)
            const data = await response.json()
            if (response.ok) {
                setOrders(data)
            } else {
                toast.error(data.error)
            }
        } catch (error) {
            toast.error("Server error fetching the orders. Try again later.")
        }
    }

    async function getStatus() {
        try {
            const response = await fetch(`${process.env.API}/admin/orders/status`)
            const data = await response.json()
            if (response.ok) {
                setStatusObj(data)
            } else {
                toast.error(data.error)
            }
        } catch (error) {
            toast.error("Server error fetching the orders status. Try again later.")
        }
    }

    async function getAmounts() {
        try {
            const response = await fetch(`${process.env.API}/admin/orders/amounts`)
            const data = await response.json()
            if (response.ok) {
                setShippingCost(data.shipping_cost)
                setTaxesAmount(data.taxes_amount)
                setLoading(false)
            } else {
                setLoading(false)
                toast.error(data.error)
            }
        } catch (error) {
            setLoading(false)
            toast.error("Server error fetching the amounts. Try again later.")
        }
    }

    async function handleStatusChange(newStatus, oldStatus, orderId) {
        try {
            const response = await fetch(`${process.env.API}/admin/order/${orderId}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ delivery_status: newStatus })
            });

            if (response.ok) {
                setOrders((prevOrders) =>
                    prevOrders.map((o) =>
                        o._id === orderId ? { ...o, delivery_status: newStatus } : o
                    )
                );
                if (["processing", "Dispatched", "Delivered"].includes(newStatus)) {
                    if(shippingCost !== 0) setShippingCost((prevShippingCost) => prevShippingCost - 5)
                } else {
                    setShippingCost((prevShippingCost) => prevShippingCost + 5)
                }
                console.log(oldStatus, newStatus)
                setStatusObj((prevStatus) => {
                    return {
                        ...prevStatus,
                        [oldStatus]: prevStatus[oldStatus] - 1,
                        [newStatus]: prevStatus[newStatus] + 1
                    };
                })
                toast.success("Order status updated successfully.");
            } else {
                const data = await response.json();
                toast.error(data.error);
            }
        } catch (error) {
            console.log(error);
            toast.error("An error occurred while updating order status.");
        }
    }


    useEffect(() => {
        getOrders()
        getStatus()
        getAmounts()
    }, [])

    return (
        <>
            {loading ?
                <div className="flex h-screen items-center justify-center bg-white dark:bg-black">
                    <div className="h-16 w-16 animate-spin rounded-full border-4 border-solid border-primary border-t-transparent"></div>
                </div>
                :
                <div className="container">
                    <div className="grid grid-cols-1 gap-4 md:grid-cols-5 md:gap-6 xl:grid-cols-5 2xl:gap-7.5">
                        <CardDataStats title="Not Processed" total={statusObj["Not Processed"]}>
                            <FaExclamation />
                        </CardDataStats>
                        <CardDataStats title="Processing" total={statusObj["processing"]}>
                            <FaArrowsRotate />
                        </CardDataStats>
                        <CardDataStats title="Dispatched" total={statusObj["Dispatched"]}>
                            <FaTruckLoading />
                        </CardDataStats>
                        <CardDataStats title="Delivered" total={statusObj["Delivered"]}>
                            <FaCheck />
                        </CardDataStats>
                        <CardDataStats title="Cancelled" total={statusObj["Cancelled"]}>
                            <FaRegWindowClose />
                        </CardDataStats>
                    </div>
                    <div className="grid grid-cols-1 gap-4 md:grid-cols-3 md:gap-6 xl:grid-cols-3 2xl:gap-7.5 mt-5">
                        <CardDataStats title="Shipping Rate Amount" total={shippingCost} money={true}>
                            <FaShippingFast />
                        </CardDataStats>
                        <CardDataStats title="VAT Amount" total={taxesAmount.toFixed(2)} money={true}>
                            <FaReceipt />
                        </CardDataStats>
                        <CardDataStats title="Profit" total={321} money={true}>
                            <FaDollarSign />
                        </CardDataStats>
                    </div>
                    <div className="mx-auto">
                        <p className="text-2xl font-bold my-10">ORDERS LIST</p>
                        <OrdersList orders={orders} handleStatusChange={handleStatusChange} />
                    </div>
                </div>
            }
        </>
    )
}

export default AdminOrders;