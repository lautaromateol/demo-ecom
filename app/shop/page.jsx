import ProductCard from "@/components/product/ProductCard";
import ProductFilter from "@/components/product/ProductFilter";
import Pagination from "@/components/product/Pagination";

export const metadata = {
    title: "Shop"
}

async function getProducts(searchParams) {
    const searchQuery = new URLSearchParams({
        page: searchParams.page || 1,
        minPrice: searchParams.minPrice || "",
        maxPrice: searchParams.maxPrice || "",
        ratings: searchParams.ratings || "",
        category: searchParams.category || "",
        tag: searchParams.tag || "",
        brand: searchParams.brand || ""
    }).toString()

    try {
        const response = await fetch(`${process.env.API}/product/filters?${searchQuery}`, {
            next: { revalidate: 0 }
        })
        const data = await response.json()
        if (!response.ok) throw new Error("Failed to fetch products")
        if (!data || !Array.isArray(data.products)) throw new Error("No products returned")
        return {
            products: data.products,
            currentPage: data.currentPage,
            totalPages: data.totalPages
        }
    } catch (error) {
        console.log(error)
        return { products: [], currentPage: 1, totalPages: 1 }
    }
}

export default async function Shop({ searchParams }) {

    const { products, currentPage, totalPages } = await getProducts(searchParams)

    return (
        <div className="container mx-auto">
            <div className="flex flex-wrap">
                <div className="w-full lg:w-1/4 overflow-auto max-h-[90vh]">
                    <ProductFilter pathname={'/shop'} searchParams={searchParams} displayCategory={true} />
                </div>
                <div className="w-full lg:w-3/4 p-4">
                    <h1 className="text-4xl font-bold text-center uppercase">All products</h1>
                    <div className="grid grid-cols-1 md:grid-cols-3 mt-5">
                        {products?.map((product) => (
                            <ProductCard key={product._id} product={product} />
                        ))}
                    </div>
                    <Pagination pathname='/shop' totalPages={totalPages} currentPage={currentPage}/>
                </div>
            </div>
        </div>
    )
}