import { useEffect } from "react";
import { useProductContext } from "@/context/ProductContext";
import { useCategoryContext } from "@/context/CategoryContext";
import { useTagContext } from "@/context/TagContext";

const CreateProduct = () => {

    const { product, setProduct, updatingProduct, setUpdatingProduct, createProduct, updateProduct, deleteProduct, uploading, setUploading, uploadeImages, deleteImages } = useProductContext()

    const { categories, fetchCategories } = useCategoryContext()

    const { tags, fetchTags } = useTagContext()

    useEffect(() => {
        fetchCategories()
        fetchTags()
    }, [])

    return (
        <div className="my-5">
            <input type="text" placeholder="Title"
                className="border-b-2 focus:outline-none focus:border-blue-200 border-gray-200 my-2 w-full"
                value={updatingProduct ? updatingProduct?.title : product?.title}
                onChange={(e) => {
                    updatingProduct ? setUpdatingProduct({ ...updatingProduct, title: e.target.value }) : setProduct({ ...product, title: e.target.value })
                }}
            />
            <textarea
                className="border-2 border-gray-200 focus:outline-none focus:border-blue-200 my-2"
                rows={5} cols={50}
                placeholder="Description"
                value={updatingProduct ? updatingProduct?.description : product?.description}
                onChange={(e) => {
                    updatingProduct ? setUpdatingProduct({ ...updatingProduct, description: e.target.value }) : setProduct({ ...product, description: e.target.value })
                }}
            >
            </textarea>
            <input className="w-full border-b-2 outline-none focus:border-blue-200 border-gray-200 my-2"
                type="number" min="1" placeholder="Price"
                value={updatingProduct ? updatingProduct?.price : product?.price}
                onChange={(e) => {
                    updatingProduct ? setUpdatingProduct({ ...updatingProduct, price: e.target.value }) : setProduct({ ...product, price: e.target.value })
                }}
            />
            <input type="text" placeholder="Color"
                className="border-b-2 focus:outline-none focus:border-blue-200 border-gray-200 my-2 w-full"
                value={updatingProduct ? updatingProduct?.color : product?.color}
                onChange={(e) => {
                    updatingProduct ? setUpdatingProduct({ ...updatingProduct, color: e.target.value }) : setProduct({ ...product, color: e.target.value })
                }}
            />
            <input type="text" placeholder="Brand"
                value={updatingProduct ? updatingProduct?.brand : product?.brand}
                className="border-b-2 focus:outline-none focus:border-blue-200 border-gray-200 my-2 w-full"
                onChange={(e) => {
                    updatingProduct ? setUpdatingProduct({ ...updatingProduct, brand: e.target.value }) : setProduct({ ...product, brand: e.target.value })
                }}
            />
            <input type="number" min="1" placeholder="Stock"
                className="w-full border-b-2 outline-none focus:border-blue-200 border-gray-200 my-2"
                value={updatingProduct ? updatingProduct?.stock : product?.stock}
                onChange={(e) => {
                    updatingProduct ? setUpdatingProduct({ ...updatingProduct, stock: e.target.value }) : setProduct({ ...product, stock: e.target.value })
                }}
            />
            <select className="w-full border-b-2 my-2 outline-none focus:border-blue-200" name="category"
                onChange={(e) => {
                    const categoryId = e.target.value
                    const categoryName = e.target.options[e.target.selectedIndex].getAttribute("name")
                    const category = categoryId
                        ? { _id: categoryId, name: categoryName }
                        : null
                    if (updatingProduct) {
                        setUpdatingProduct({ ...updatingProduct, category })
                    } else {
                        setProduct({ ...product, category })
                    }
                }}
                value={updatingProduct ? updatingProduct?.category?._id : product?.category?._id}
            >
                <option value="">Select a category</option>
                {categories?.map((c) => (
                    <option value={c._id} key={c._id} name={c?.name}>{c?.name}</option>
                ))}
            </select>
            <div className="flex flex-wrap justify-evenly items-center">
                {tags
                    ?.filter(
                        (ft) =>
                            ft?.parent ===
                            (updatingProduct?.category?._id || product?.category?._id))
                    ?.map((t) => (
                        <div key={t?._id}>
                            <input
                                type="checkbox"
                                value={t?._id}
                                onChange={(e) => {
                                    const tagId = e.target.value;
                                    const tagName = t?.name

                                    let selectedTags = updatingProduct ?
                                        [...(updatingProduct?.tags ?? [])]
                                        :
                                        [...(product?.tags ?? [])]

                                    if (e.target.checked) {
                                        selectedTags.push({ _id: tagId, name: tagName })
                                    } else {
                                        selectedTags = selectedTags.filter((t) => t._id !== tagId)
                                    }
                                    if (updatingProduct) {
                                        setUpdatingProduct({ ...updatingProduct, tags: selectedTags })
                                    } else {
                                        setProduct({ ...product, tags: selectedTags })
                                    }
                                }}
                            />
                            <label>{t?.name}</label>
                        </div>
                    ))}
            </div>
            <div className="flex justify-center items-center">
                <label
                className={`w-full text-center p-2 hover:bg-gray-200 text-blue-400 uppercase cursor-pointer my-2 ${uploading ? "disabled" : ""}`}>
                    {uploading ? "Processing" : "Upload Images"}
                <input
                type="file"
                hidden
                multiple
                accept="images/*"
                onChange={uploadeImages}
                disabled={uploading}
                />
                </label>
            </div>
        </div>
    )

}

export default CreateProduct