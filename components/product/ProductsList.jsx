"use client";
import { useProductContext } from "@/context/ProductContext"
import { useRouter } from "next/navigation"
import { Table } from "antd"

const ProductsList = ({products}) => {

    const { setUpdatingProduct } = useProductContext()

    const router = useRouter()

    const handleClick = (product) => {
        setUpdatingProduct(product)
        router.push('/dashboard/admin/product')
    }

    const columns = [
        {
            title: 'Image',
            key: 'main_images[0].public_id',
            dataIndex: 'main_images',
            render: (main_images, record) => (
                <img className="h-15 w-12" src={main_images[0].secure_url} alt={record.title}/>
            )
        },
        {
            title: 'Title',
            key: 'title',
            dataIndex: 'title'
        },
        {
            title: 'Description',
            key: 'description',
            dataIndex: 'description',
            render: (description) => (
                <span>{description.length > 160 ? `${description.substring(0, 160)}...` : description}</span>
            )
        },
        {
            title: 'Price',
            key: 'price',
            dataIndex: 'price',
            render: (price) => (
                <span>${price.toFixed(2)}</span>
            )
        },
        {
            title: 'Stock',
            key: 'stock',
            dataIndex: 'stock',
        },
        {
            title: 'Update',
            key: '_id',
            dataIndex: '_id',
            render: (_id, record) => (
                <button onClick={() => handleClick(record)} className="text-green-500">UPDATE</button>
            )
        },
    ]

    return (
        <div className="mt-5">
            <Table
                dataSource={products}
                columns={columns}
                rowKey={(record) => record._id}
            />
        </div>
    )
}

export default ProductsList;