"use client"
import CreateProduct from "@/components/product/CreateProduct"
import { useProductContext } from "@/context/ProductContext"

const AddProduct = () => {

    const {updatingProduct} = useProductContext()

    return (
        <div className="container">
            <div className="mx-auto max-w-4xl p-4">
                <p className="text-2xl my-10">{updatingProduct ? "Update product" : "Create product"}</p>
                <CreateProduct />
            </div>
        </div>
    )
}

export default AddProduct;