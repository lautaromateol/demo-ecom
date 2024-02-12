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
            title: 'Charge ID',
            dataIndex: 'chargeId',
            key: 'chargeId'
        },
        {
            title: 'Payment Intent',
            dataIndex: 'payment_intent',
            key:'payment_intent'
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

