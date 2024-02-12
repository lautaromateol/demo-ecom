"use client"
import { useEffect } from "react"
import { useTagContext } from "@/context/TagContext"
import { useCategoryContext } from "@/context/CategoryContext"
import { Table } from "antd"

const TagsList = () => {

    const { fetchTags, tags, setUpdatingTag } = useTagContext()

    const { categories, fetchCategories } = useCategoryContext()

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
            title: 'Parent Category',
            dataIndex: 'parent',
            key: 'parent',
            render: (parent) => {
                const parentCategory = categories.filter((c) => c._id === parent)
                return (
                    <>
                        {
                            parentCategory.length ?
                                <span>{parentCategory[0].name}</span>
                                :
                                <span className="text-red-500 uppercase">Category Deleted</span>
                        }
                    </>
                )
            }
        },
        {
            title: 'Update',
            dataIndex: '_id',
            key: '_id',
            render: (_id, record) => (
                <button onClick={() => setUpdatingTag(record)} className="text-green-500">UPDATE</button>
            )
        }
    ]

    useEffect(() => {
        fetchTags()
    }, [])

    return (
        <div className="mt-5">
            <Table
                dataSource={tags}
                columns={columns}
                rowKey={(record) => record._id}
            />
        </div>
    )
}

export default TagsList