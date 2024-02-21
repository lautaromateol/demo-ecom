import { Table } from 'antd';

export default function OrdersList({ orders, handleStatusChange }) {

    const columns = [
        {
            title: 'Customer Name',
            dataIndex: 'userId',
            key: 'userId',
            render: (userId) => (
                <span>{userId.name}</span>
            )
        },
        {
            title: 'Products',
            dataIndex: 'cartItems',
            key: 'cartItems',
            render: (cartItems) =>
                cartItems.map((item) => (
                    <span>{cartItems.indexOf(item) === cartItems.length - 1 ? item.title : `${item.title}, `}</span>
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
            title: 'Refunded',
            dataIndex: 'refunded',
            key: 'refunded',
            render: (refunded) => (
                <span>{refunded ? "Yes" : "No"}</span>
            )
        },
        {
            title: 'Delivery Status',
            key: 'delivery_status',
            dataIndex: 'delivery_status',
            render: (delivery_status, record) => (
                <select
                    onChange={(e) =>
                        handleStatusChange(e.target.value, delivery_status, record._id)
                    }
                    value={delivery_status}
                    disabled={record.refunded}
                >
                    <option value="Not Processed">Not Processed</option>
                    <option value="processing">Processing</option>
                    <option value="Dispatched">Dispatched</option>
                    {record.refunded && (
                        <option value="Cancelled">Cancelled</option>
                    )}
                    <option value="Delivered">Delivered</option>
                </select>
            )
        },
        {
            title: 'Receipt URL',
            dataIndex: 'receipt_url',
            key: 'receipt_url',
            render: (receipt_url) => (
                <a target="_blank" href={receipt_url} className="text-red-500 uppercase">View</a>
            )
        },
        {
            title: 'Charge ID',
            dataIndex: 'chargeId',
            key: 'chargeId'
        },
        {
            title: 'Payment Intent',
            dataIndex: 'payment_intent',
            key: 'payment_intent'
        },
        {
            title: 'Payment Date',
            dataIndex: 'createdAt',
            key: 'createdAt',
            render: (createdAt) => (
                <span>{new Date(createdAt).toLocaleDateString()}</span>
            )
        },
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

