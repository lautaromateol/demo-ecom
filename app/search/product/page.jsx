"use client"
import ProductCard from "@/components/product/ProductCard";
import { useProductContext } from "@/context/ProductContext";
import { useSearchParams } from "next/navigation";
import { useEffect } from "react";

const SearchResults = () => {

    const { productSearchResults, setProductSearchResults } = useProductContext()

    const searchParams = useSearchParams()

    const query = searchParams.get("productSearchQuery")

    const fetchProductSearchResultsReload = async () => {
        try {
            const response = await fetch(`${process.env.API}/product/search?title=${query}`, {
                method: "GET"
            })
            const data = await response.json()
            if (response.ok) {
                setProductSearchResults(data)
            } else {
                toast.error(data.error)
            }
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        fetchProductSearchResultsReload()
    }, [query])

    return (
        <div className="container">
            <div className="mx-auto max-w-5xl p-4">
                <h4 className="text-xl font-bold uppercase">Search results: {productSearchResults?.length}</h4>
                <hr className="w-full my-2" />
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
                    {productSearchResults?.map((product) => (
                        <ProductCard key={product?._id} product={product} />
                    ))}
                </div>
            </div>
        </div>
    )
}

export default SearchResults;