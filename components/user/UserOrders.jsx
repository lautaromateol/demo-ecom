import { useRouter } from "next/navigation";
import { Table } from 'antd';
import toast from "react-hot-toast";

export default function UserOrders({ orders }) {

    const router = useRouter()

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

    const columns = [
        {
            title: 'Products',
            dataIndex: 'cartItems',
            key: 'cartItems',
            render: (cartItems) =>
                cartItems.map((item) => (
                    <span>{item.title}</span>
                ))
        },
        {
            title: 'Amount Spent',
            dataIndex: 'amount_captured',
            key: 'amount_captured',
            render: (amount_captured) => (
                <span>${(amount_captured / 100).toFixed(2)}</span>
            )
        },
        {
            title: 'Delivery Status',
            key: 'delivery_status',
            dataIndex: 'delivery_status',
            render: (delivery_status, record) => (
                <>
                    {
                        delivery_status === "Not Processed" && record.refunded === false ? (
                            <>
                                <span className="block">{delivery_status}</span>
                                <button className="text-red-500 uppercase" onClick={()=> handleCancelOrder(record._id)}>Cancel the order</button>
                            </>
                        ) : (
                            <span>{delivery_status}</span>
                        )
                    }
                </>
            )
        },
        {
            title: 'Refunded',
            dataIndex: 'refunded',
            key: 'refunded',
            render: (refunded) => (
                <span>{refunded ? "Yes" : "No"}</span>
            )
        },
        {
            title: 'Receipt URL',
            dataIndex: 'receipt_url',
            key: 'receipt_url',
            render: (receipt_url) => (
                <a target="_blank" href={receipt_url} className="text-red-500 uppercase">View Receipt</a>
            )
        },
        {
            title: 'Payment Date',
            dataIndex: 'createdAt',
            key: 'createdAt',
            render: (createdAt) => (
                <span>{new Date(createdAt).toLocaleDateString()}</span>
            )
        }
    ];

    return (
        <div className="mt-5">
            <Table
                dataSource={orders}
                columns={columns}
                rowKey={(record) => record._id}
            />
        </div>
    )
}

