import { useEffect } from "react";
import { useProductContext } from "@/context/ProductContext";
import { useCategoryContext } from "@/context/CategoryContext";
import { useTagContext } from "@/context/TagContext";
import { useEditionContext } from "@/context/EditionContext";
import slugify from "slugify";

const CreateProduct = () => {

    const { product, setProduct, updatingProduct, setUpdatingProduct, createProduct, updateProduct, deleteProduct, uploading, uploadImages, uploadEditionImages, deleteImage } = useProductContext()

    const { categories, fetchCategories } = useCategoryContext()

    const { tags, fetchTags } = useTagContext()

    const imagePreviews = updatingProduct ? updatingProduct?.main_images : product?.main_images || []

    const { editions, fetchEditions } = useEditionContext()

    useEffect(() => {
        fetchCategories()
        fetchTags()
        fetchEditions()
    }, [])

    return (
        <div className="shadow-lg my-5 p-8">
            <input type="text" placeholder="Title"
                className="border-b-2 focus:outline-none focus:border-blue-200 my-3 w-full"
                value={updatingProduct ? updatingProduct?.title : product?.title}
                onChange={(e) => {
                    updatingProduct ? setUpdatingProduct({ ...updatingProduct, title: e.target.value }) : setProduct({ ...product, title: e.target.value })
                }}
            />
            <textarea
                className="border-2 focus:outline-none focus:border-blue-200 my-3"
                rows={5} cols={50}
                placeholder="Description"
                value={updatingProduct ? updatingProduct?.description : product?.description}
                onChange={(e) => {
                    updatingProduct ? setUpdatingProduct({ ...updatingProduct, description: e.target.value }) : setProduct({ ...product, description: e.target.value })
                }}
            >
            </textarea>
            <input type="text" placeholder="Developer"
                value={updatingProduct ? updatingProduct?.developer : product?.developer}
                className="border-b-2 focus:outline-none focus:border-blue-200 my-3 w-full"
                onChange={(e) => {
                    updatingProduct ? setUpdatingProduct({ ...updatingProduct, developer: e.target.value }) : setProduct({ ...product, developer: e.target.value })
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
                                checked={updatingProduct?.tags.some((el) => el.name === t?.name)}
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
            <p className="my-3 border-b-2 text-gray-400">Editions available</p>
            <div className="my-3 w-full flex flex-wrap justify-evenly items-center">
                {editions?.map((ed) => (
                    <div key={ed._id}>
                        <input
                            type="checkbox"
                            checked={updatingProduct?.editions.some((el) => el.console === ed.console)}
                            value={ed._id}
                            onChange={(e) => {

                                const editionId = e.target.value

                                const editionConsole = ed.console

                                const editionSlug = slugify(editionConsole)

                                let selectedEditions = updatingProduct ?
                                    [...(updatingProduct?.editions ?? [])]
                                    :
                                    [...(product?.editions ?? [])]

                                if (e.target.checked) {
                                    selectedEditions.push({ _id: editionId, console: editionConsole, slug: editionSlug, stock: 0 })
                                } else {
                                    selectedEditions = selectedEditions.filter((e) => e.console !== editionConsole)
                                }
                                if (updatingProduct) {
                                    setUpdatingProduct({ ...updatingProduct, editions: selectedEditions })
                                } else {
                                    setProduct({ ...product, editions: selectedEditions })
                                }
                            }}
                        />
                        <label>{ed.console}</label>
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
                            style={{ width: "120px", height: "150px", objectFit: "center" }}
                        />
                        <br />
                        <div className="text-center cursor-pointer"
                            onClick={() => deleteImage(img?.public_id)}>
                            ❌
                        </div>
                    </div>
                ))}
            </div>
            {updatingProduct && (
                updatingProduct.editions.map((ed) => (
                    <div className="flex my-3 border-2 border-gray-200 h-[12rem] w-full rounded-md shadow-lg" key={ed._id}>
                        <div className="grid place-content-center border-r-2 w-1/6 my-3 overflow-hidden">
                            <label
                                className={`text-blue-400 uppercase cursor-pointer ${uploading ? "disabled" : ""}`}>
                                {uploading ? "Processing" : "Upload image"}
                                {!ed.image && <input
                                    type="file"
                                    hidden
                                    multiple
                                    accept="images/*"
                                    onChange={(e) => uploadEditionImages(e, ed)}
                                    disabled={uploading}
                                />}
                                {
                                    ed.image && <img className="w-full h-full p-1 object-center" src={ed.image.secure_url} />
                                }
                            </label>
                        </div>
                        <div className="flex items-center justify-center flex-col p-2 w-5/6">
                            <p className="text-center uppercase font-bold my-2">Update price and stock</p>
                            <div className="flex items-center justify-center">

                                <strong>{ed.console}</strong>
                                <input
                                    type="number"
                                    min={1}
                                    className="mx-2 rounded-full outline-none shadow-lg border-2 border-gray-200 p-2"
                                    placeholder={`Last stock: ${updatingProduct.editions[updatingProduct.editions.indexOf(ed)].stock}`}
                                    onChange={(e) => {
                                        let allEditions = updatingProduct?.editions
                                        const edition = ed
                                        edition.stock = e.target.value
                                        allEditions = allEditions.map((ed) => (
                                            ed._id === edition._id ? edition : ed
                                        ))
                                        setUpdatingProduct({ ...updatingProduct, editions: allEditions })
                                    }}
                                />
                                <input
                                    type="number"
                                    min={1}
                                    className="mx-2 rounded-full outline-none shadow-lg border-2 border-gray-200 p-2"
                                    placeholder={`Last price: $${updatingProduct.editions[updatingProduct.editions.indexOf(ed)].price.toFixed(2)}`}
                                    onChange={(e) => {
                                        let allEditions = updatingProduct?.editions
                                        const edition = ed
                                        edition.price = e.target.value
                                        allEditions = allEditions.map((ed) => (
                                            ed._id === edition._id ? edition : ed
                                        ))
                                        setUpdatingProduct({ ...updatingProduct, editions: allEditions })
                                    }}
                                />
                            </div>
                        </div>
                    </div>
                ))
            )}
            {product?.editions && (
                product.editions.map((ed) => (
                    <div className="flex my-3 border-2 border-gray-200 h-[9rem] w-full rounded-md shadow-lg" key={ed._id}>
                        <div className="grid place-content-center border-r-2 w-1/6 my-3 overflow-hidden">
                            <label
                                className={`text-blue-400 uppercase cursor-pointer ${uploading ? "disabled" : ""}`}>
                                {uploading ? "Processing" : "Upload image"}
                                {!ed.image && <input
                                    type="file"
                                    hidden
                                    multiple
                                    accept="images/*"
                                    onChange={(e) => uploadEditionImages(e, ed)}
                                    disabled={uploading}
                                />}
                                {
                                    ed.image && <img className="w-full h-full object-center" src={ed.image.secure_url} />
                                }
                            </label>
                        </div>
                        <div className="flex items-center justify-center p-2 w-5/6">
                            <strong>{ed.console}</strong>
                            <input
                                type="number"
                                min={1}
                                className="mx-2 rounded-full outline-none shadow-lg border-2 border-gray-200 p-2"
                                placeholder="Stock"
                                onChange={(e) => {
                                    let allEditions = product?.editions
                                    const edition = ed
                                    edition.stock = e.target.value
                                    allEditions = allEditions.map((ed) => (
                                        ed._id === edition._id ? edition : ed
                                    ))
                                    setProduct({ ...product, editions: allEditions })
                                }}
                            />
                            <input
                                type="number"
                                min={1}
                                className="mx-2 rounded-full outline-none shadow-lg border-2 border-gray-200 p-2"
                                placeholder="Price"
                                onChange={(e) => {
                                    let allEditions = product?.editions
                                    const edition = ed
                                    edition.price = e.target.value
                                    allEditions = allEditions.map((ed) => (
                                        ed._id === edition._id ? edition : ed
                                    ))
                                    setProduct({ ...product, editions: allEditions })
                                }}
                            />
                        </div>
                    </div>
                ))
            )}
            <div>
                <button className="mt-10 px-4 py-2 bg-blue-500 text-white rounded-full m-2"
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
                        <button className="mt-10 px-4 py-2 bg-red-500 text-white rounded-full m-2" onClick={(e) => {
                            e.preventDefault()
                            deleteProduct()
                        }}>
                            Delete
                        </button>
                        <button className="mt-10 px-4 py-2 bg-black text-white rounded-full m-2" onClick={() => setUpdatingProduct(null)}>
                            Clear
                        </button>
                    </>
                )}
            </div>
        </div>
    )

}

export default CreateProduct;