"use client";
import CategoriesList from '@/components/category/CategoriesList';
import CreateCategory from '@/components/category/CreateCategory';

const AdminCategoriesPage = () => {
    return (
        <div className="container">
            <div className="mx-auto max-w-4xl p-4">
                <p className="text-2xl font-bold my-10">CREATE CATEGORY</p>
                <CreateCategory/>
                <p className="text-2xl font-bold my-10">CATEGORIES LIST</p>
                <CategoriesList />
            </div>
        </div>
    )
}

export default AdminCategoriesPage;