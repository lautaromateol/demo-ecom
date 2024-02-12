"use client"
import { useEffect } from "react"
import { useCategoryContext } from "@/context/CategoryContext"
import { Table } from "antd"

const CategoriesList = () => {

    const { fetchCategories, categories, setUpdatingCategory } = useCategoryContext()

    const columns = [
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name'
        },
        {
            title: 'Slug',
            dataIndex: 'slug',
            key: 'slug'
        },
        {
            title: 'Update',
            dataIndex: '_id',
            key: '_id',
            render: (_id, record) => (
                <button onClick={() => setUpdatingCategory(record)} className="text-green-500">UPDATE</button>
            )
        }
    ]

    useEffect(() => {
        fetchCategories()
    }, [])

    return (
        <div className="mt-5">
            <Table
                columns={columns}
                dataSource={categories}
                rowKey={(record) => record._id}
            />
        </div>
    )
}

export default CategoriesList