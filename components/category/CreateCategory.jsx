"use client";
import { useCategoryContext } from "@/context/CategoryContext";
import toast from "react-hot-toast";

const CreateCategory = () => {

    const { category, setCategory, updatingCategory, setUpdatingCategory, createCategory, updateCategory, deleteCategory, uploadImages, deleteImage, uploading } = useCategoryContext()

    const imagePreviews = updatingCategory ? updatingCategory?.images : category?.images || []

    return (
        <div>
            <input type="text"
                value={updatingCategory ? updatingCategory?.name : category?.name}
                onChange={(e) => updatingCategory ? setUpdatingCategory({ ...updatingCategory, name: e.target.value }) : setCategory({ ...category, name: e.target.value })}
                className="border-b border-b-2 focus:outline-none focus:border-blue-200 border-gray-200 my-2 w-full" />
            <div className="flex justify-center items-center my-3">
                <label
                    className={`w-full p-2 hover:bg-gray-200 text-blue-400 uppercase cursor-pointer my-2 ${uploading ? "disabled" : ""}`}>
                    {uploading ? "Processing" : "Upload category image"}
                    <input
                        type="file"
                        hidden
                        multiple
                        accept="images/*"
                        onChange={uploadImages}
                        disabled={uploading}
                    />
                </label>
            </div>
            <div className="flex justify-center my-3">
                {imagePreviews?.map((img) => (
                    <div key={img?.public_id}>
                        <img
                            className="mx-1 shadow object-cover w-16 h-16"
                            src={img?.secure_url}
                            style={{ width: "120px", height: "150px", objectFit: "contain" }}
                        />
                        <br />
                        <div className="text-center cursor-pointer"
                            onClick={() => deleteImage(img?.public_id)}>
                            ❌
                        </div>
                    </div>
                ))}
            </div>
            <button className="mt-5 px-4 py-2 rounded-full bg-blue-500 text-white m-2"
                onClick={
                    (e) => {
                        e.preventDefault()
                        if (!updatingCategory && !category) {
                            toast.error("You have to provide a name")
                            return
                        }
                        if (category.name && category.name.length > 20) {
                            toast.error("The category name is too long. Max length: 20 caracters")
                        }
                        updatingCategory ? updateCategory() : createCategory()
                    }
                }>
                {updatingCategory ? 'Update' : 'Create'}
            </button>
            {updatingCategory && (
                <>
                    <button className="mt-5 px-4 py-2 rounded-full bg-red-500 text-white m-2" onClick={(e) => {
                        e.preventDefault()
                        deleteCategory()
                    }}>
                        Delete
                    </button>
                    <button className="mt-5 px-4 py-2 rounded-full bg-black text-white m-2" onClick={() => setUpdatingCategory(null)}>
                        Clear
                    </button>
                </>
            )}
            <pre>{JSON.stringify(category, null, 4)}</pre>
        </div>
    )
}

export default CreateCategory