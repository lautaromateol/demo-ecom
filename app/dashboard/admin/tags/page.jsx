"use client";
import TagsList from '@/components/tag/TagsList';
import CreateTag from '@/components/tag/CreateTag';

const AdminCategoriesPage = () => {
    return (
        <div className="container">
            <div className="mx-auto max-w-4xl p-4">
                <p className="text-2xl font-bold my-10">CREATE TAG</p>
                <CreateTag/>
                <p className="text-2xl font-bold my-10">TAGS LIST</p>
                <TagsList/>
            </div>
        </div>
    )
}

export default AdminCategoriesPage;