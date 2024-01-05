import { useTagContext } from "@/context/TagContext";
import { useCategoryContext } from "@/context/CategoryContext";
import { useEffect } from "react";
import toast from "react-hot-toast";

const CreateTag = () => {

    const { name, setName, parent, setParent, updatingTag, setUpdatingTag, createTag, updateTag, deleteTag } = useTagContext()

    const { fetchCategories, categories } = useCategoryContext()

    useEffect(() => {
        fetchCategories()
    }, [])

    return (
        <div className="my-5">
            <input type="text"
                value={updatingTag ? updatingTag.name : name}
                className="border-b border-b-2 focus:outline-none focus:border-blue-200 border-gray-200 my-2 w-full"
                placeholder="Tag name"
                onChange={(e) => updatingTag ? setUpdatingTag({ ...updatingTag, name: e.target.value }) : setName(e.target.value)}
            />
            <div className="my-5">
                <label>Parent category</label>
                <select className="border border-2 border-gray-300 mx-2" name="category"
                    onChange={(e) => {
                        updatingTag ? setUpdatingTag({ ...updatingTag, parent: e.target.value }) : setParent(e.target.value)
                    }}
                >
                    <option value="">Select One</option>
                    {categories.map((c) => (
                        <option key={c._id} value={c._id}
                            selected={c._id === updatingTag?.parent || c._id === parent}
                        >
                            {c.name}
                        </option>
                    ))}
                </select>
            </div>
            <div className="flex justify-between">
                <button 
                className="mt-5 px-4 py-2 bg-blue-500 text-white m-2"
                onClick={(e) => {
                    e.preventDefault()
                    if(!parent){
                        toast.error("Select a parent category")
                        return
                    }
                    updatingTag ? updateTag() : createTag()
                }}>
                    {updatingTag ? "Update" : "Create"}
                </button>
                {updatingTag && (
                    <>
                        <button className="mt-5 px-4 py-2 bg-red-500 text-white m-2" onClick={(e) => {
                            e.preventDefault()
                            deleteTag()
                        }}>
                            Delete
                        </button>
                        <button className="mt-5 px-4 py-2 bg-black text-white m-2" onClick={() => setUpdatingTag(null)}>
                            Clear
                        </button>
                    </>
                )}
            </div>
        </div>
    )

}

export default CreateTag