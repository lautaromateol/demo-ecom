import { Table } from 'antd';
import Stars from '../product/Stars';

export default function ReviewsList({ reviews, handleDelete }) {

    const columns = [
        {
            title: 'Rating',
            dataIndex: 'ratings',
            key: 'ratings._id',
            render: (ratings) => (
                <Stars rating={ratings.rating}/>
            )
        },
        {
            title: 'Product',
            dataIndex: 'product',
            key: 'product._id',
            render: (product) =>
                <span>{product.title}</span>
        },
        {
            title: 'Comment',
            dataIndex: 'ratings',
            key: 'ratings._id',
            render: (ratings) => (
                <span>{ratings.comment}</span>
            )
        },
        {
            title: 'Posted By',
            dataIndex: 'ratings',
            key: 'ratings.postedBy._id',
            render: (ratings) => (
                <span>{ratings.postedBy.name}</span>
            )
        },
        {
            title: 'Delete',
            dataIndex: 'ratings',
            key: 'ratings._id',
            render: (ratings) => (
                <button className='text-red-500' onClick={() => handleDelete(ratings._id)}>DELETE</button>
            )
        }
    ];

    return (
        <div className="mt-5">
            <Table
                dataSource={reviews}
                columns={columns}
                rowKey={(record) => record._id}
            />
        </div>
    )
}

