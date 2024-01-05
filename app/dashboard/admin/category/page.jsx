"use client"
import CreateCategory from "@/components/category/CreateCategory"
import CategoriesList from "@/components/category/CategoriesList"

const Categories = () => {
    return (
        <div className="container">
            <div className="mx-auto max-w-4xl p-4">
                <p className="text-2xl my-10">Create category</p>
                <CreateCategory />
                <p className="text-2xl my-10">Category's list</p>
                <CategoriesList />
            </div>
        </div>
    )
}

export default Categories