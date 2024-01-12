"use client"
import CreateTag from "@/components/tag/CreateTag"
import TagsList from "@/components/tag/TagsList"

const Tags = () => {

    return (
        <div className="container">
            <div className="mx-auto max-w-4xl p-4">
                <p className="text-2xl my-10">Create tag</p>
                <CreateTag />
                <p className="text-2xl my-10">Tag's list</p>
                <TagsList />
            </div>
        </div>
    )
}

export default Tags;