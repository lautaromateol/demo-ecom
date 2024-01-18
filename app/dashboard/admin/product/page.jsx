"use client"
import CreateProduct from "@/components/product/CreateProduct"
import { useProductContext } from "@/context/ProductContext"

const ProductsCreation = () => {

    const {updatingProduct} = useProductContext()

    return (
        <div className="container">
            <div className="mx-auto max-w-4xl p-4">
                <p className="text-2xl font-bold my-10">{updatingProduct ? "UPDATE PRODUCT" : "CREATE PRODUCT"}</p>
                <CreateProduct />
            </div>
        </div>
    )
}

export default ProductsCreation;