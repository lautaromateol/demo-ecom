import { useEffect } from "react";
import { useProductContext } from "@/context/ProductContext";
import { useCategoryContext } from "@/context/CategoryContext";
import { useTagContext } from "@/context/TagContext";

const CreateProduct = () => {

    const { product, setProduct, updatingProduct, setUpdatingProduct, createProduct, updateProduct, deleteProduct, uploading, uploadImages, deleteImage } = useProductContext()

    const { categories, fetchCategories } = useCategoryContext()

    const { tags, fetchTags } = useTagContext()

    const imagePreviews = updatingProduct ? updatingProduct?.main_images : product?.main_images || []

    // const { editions, fetchEditions } = useEditionContext()

    useEffect(() => {
        fetchCategories()
        fetchTags()
    }, [])

    return (
        <div>
            <input type="text" placeholder="Title"
                className="border-b-2 focus:outline-none focus:border-blue-200 my-3 w-full"
                value={updatingProduct ? updatingProduct?.title : product?.title}
                onChange={(e) => {
                    updatingProduct ? setUpdatingProduct({ ...updatingProduct, title: e.target.value }) : setProduct({ ...product, title: e.target.value })
                }}
            />
            <textarea
                className="border-2 focus:outline-none focus:border-blue-200 my-3"
                rows={5} cols={90}
                placeholder="Description"
                value={updatingProduct ? updatingProduct?.description : product?.description}
                onChange={(e) => {
                    updatingProduct ? setUpdatingProduct({ ...updatingProduct, description: e.target.value }) : setProduct({ ...product, description: e.target.value })
                }}
            >
            </textarea>
            <input type="number" placeholder="Price"
                value={updatingProduct ? updatingProduct?.price : product?.price}
                className="border-b-2 focus:outline-none focus:border-blue-200 my-3 w-full"
                onChange={(e) => {
                    updatingProduct ? setUpdatingProduct({ ...updatingProduct, price: e.target.value }) : setProduct({ ...product, price: e.target.value })
                }}
            />
            <input type="number" placeholder="Previous Price"
                value={updatingProduct ? updatingProduct?.previousPrice : product?.previousPrice}
                className="border-b-2 focus:outline-none focus:border-blue-200 my-3 w-full"
                onChange={(e) => {
                    updatingProduct ? setUpdatingProduct({ ...updatingProduct, previousPrice: e.target.value }) : setProduct({ ...product, previousPrice: e.target.value })
                }}
            />
               <input type="number" placeholder="Stock"
                value={updatingProduct ? updatingProduct?.stock : product?.stock}
                className="border-b-2 focus:outline-none focus:border-blue-200 my-3 w-full"
                onChange={(e) => {
                    updatingProduct ? setUpdatingProduct({ ...updatingProduct, stock: e.target.value }) : setProduct({ ...product, stock: e.target.value })
                }}
            />
            <select className="w-full border-b-2 my-3 outline-none focus:border-blue-200" name="category"
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
            <div className="flex flex-wrap my-3 justify-evenly items-center">
                {tags
                    ?.filter(
                        (ft) =>
                            ft?.parent ===
                            (updatingProduct?.category?._id || product?.category?._id))
                    ?.map((t) => (
                        <div key={t?._id}>
                            <input
                                type="checkbox"
                                checked={updatingProduct?.tags?.some((el) => el.name === t?.name)}
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
            <div className="flex justify-center items-center my-3">
                <label
                    className={`w-full p-2 hover:bg-gray-200 text-blue-400 uppercase cursor-pointer my-2 ${uploading ? "disabled" : ""}`}>
                    {uploading ? "Processing" : "Upload product main images"}
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
            <div>
                <button className="mt-5 px-4 py-2 bg-blue-500 text-white rounded-full m-2"
                    onClick={
                        (e) => {
                            e.preventDefault()
                            updatingProduct ? updateProduct() : createProduct()
                        }
                    }>
                    {updatingProduct ? 'Update' : 'Create'}
                </button>
                {updatingProduct && (
                    <>
                        <button className="mt-5 px-4 py-2 bg-red-500 text-white rounded-full m-2" onClick={(e) => {
                            e.preventDefault()
                            deleteProduct()
                        }}>
                            Delete
                        </button>
                        <button className="mt-5 px-4 py-2 bg-black text-white rounded-full m-2" onClick={() => setUpdatingProduct(null)}>
                            Clear
                        </button>
                    </>
                )}
            </div>
        </div>
    )

}

export default CreateProduct;