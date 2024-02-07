"use client"
import { useEffect } from "react"
import { useProductContext } from "@/context/ProductContext"
import { useRouter, usePathname, useSearchParams } from "next/navigation"
import Pagination from "./Pagination"

const ProductsList = () => {

    const { products, currentPage, totalPages, fetchProducts, setUpdatingProduct } = useProductContext()

    const router = useRouter()
    const searchParams = useSearchParams()

    const page = searchParams.get("page")

    const handleClick = (product) => {
        setUpdatingProduct(product)
        router.push('/dashboard/admin/product')
    }

    useEffect(() => {
        fetchProducts(page)
    }, [page])

    return (
        <div className="container">
            <div className="grid grid-cols-2 gap-2 my-5">
                {products?.map((product) => (
                    <div key={product?._id}>
                        <div className="h-[12rem] overflow-hidden p-1">
                            <img
                                src={product?.main_images[0]?.secure_url}
                                className="border-2 p-2 mx-auto h-full object-center"
                            />
                        </div>
                        <div className="p-2">
                            <h5 onClick={() => handleClick(product)} className="text-blue-600 cursor-pointer">
                                {product?.title}
                            </h5>
                            <p>
                                {product?.description.length > 140 ?
                                    `${product?.description.substring(0, 140)}...`
                                    : product?.description
                                }
                            </p>
                        </div>
                    </div>
                ))}
            </div>
            <Pagination totalPages={totalPages} currentPage={currentPage}/>
        </div>
    )
}

export default ProductsList;