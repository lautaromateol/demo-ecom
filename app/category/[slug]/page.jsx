import ProductCard from "@/components/product/ProductCard";
import ProductFilter from "@/components/product/ProductFilter";
import Link from "next/link";

export async function generateMetadata({ params, searchParams }){
    const { category } = await getCategory(params.slug, searchParams)
    if(category) {
        return {
            title: category.name
        }
    } else return null
}

async function getCategory(slug, searchParams) {
    const searchQuery = new URLSearchParams({
        page: searchParams.page || 1,
        minPrice: searchParams.minPrice || "",
        maxPrice: searchParams.maxPrice || "",
        ratings: searchParams.ratings || "",
        category: searchParams.category || "",
        tag: searchParams.tag || "",
        brand: searchParams.brand || ""
    }).toString()

        const response = await fetch(`${process.env.API}/category/${slug}?${searchQuery}`, {
            next: { revalidate: 0}
        });
        const data = await response.json();
        if (response.ok) {
            return {
                category: data.category,
                products: data.products
            }
        } else {
            console.log(data.error)
            return {
                category: null
            }
        }
}

export default async function CategoryViewPage({ params, searchParams }) {

    const { category, products } = await getCategory(params.slug, searchParams)

    if (!category) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="flex flex-col items-center justify-center">
                    <p className="text-2xl mb-5">Category not found!</p>
                    <Link href='/shop' className="px-4 py-2 bg-green-700 rounded-lg text-white font-bold">
                        CONTINUE SHOPPING
                    </Link>
                </div>
            </div>
        )
    }

    return (
        <div className="container mx-auto">
            <div className="flex flex-wrap">
                <div className="w-full lg:w-1/4 overflow-auto max-h-[90vh]">
                    <ProductFilter pathname={`/category/${params.slug}`} searchParams={searchParams} displayCategory={false} displayTags={true} categoryId={category._id}/>
                </div>
                <div className="w-full lg:w-3/4 p-4">
                    <h1 className="text-4xl font-bold text-center uppercase">{category.name}</h1>
                    <div className="grid grid-cols-1 md:grid-cols-3 mt-5">
                        {products?.map((product) => (
                            <ProductCard key={product._id} product={product} />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}

