"use client"
import { useRouter } from "next/navigation";

const ProductEditions = ({product, selectedEdition}) => {

    const router = useRouter()

    return (
        <div className="flex items-center mt-2">
            {product?.editions?.map((ed) => (
                <button key={ed?.console} onClick={() => router.push(`/product/${product?.slug}?edition=${ed?.slug}`)} className={`${ed?.console === selectedEdition?.console ? "bg-gray-700 text-white" : "bg-gray-300"} text-gray-700 dark:text-white py-1 px-2 rounded-full font-bold mr-2 ${selectedEdition?.console !== ed?.console && "hover:bg-gray-400"} dark:hover:bg-gray-600`}><small>{ed?.console}</small></button>))}
        </div>
    )
}

export default ProductEditions;