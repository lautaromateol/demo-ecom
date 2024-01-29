"use client";
import ProductImage from "@/components/product/ProductImage"
import ProductLike from "@/components/product/ProductLike"
import ProductRating from "@/components/product/ProductRating"
import ProductReviews from "@/components/product/ProductReviews"
import ProductEditions from "@/components/product/ProductEditions"
import AddToCart from "@/components/product/AddToCart";

// export async function generateMetadata({params}){
//     try {
//         const response = await fetch(`${process.env.API}/product/${params?.slug}`)
//         const data = await response.json()
//     if(response.ok){
//         return {
//             title: data?.product?.title,
//             description: data?.product?.description?.substring(0, 160)
//         }
//     } else {
//         throw new Error("Fetching product has failed")
//     }
//     } catch (error) {
//         console.log(error.message)
//     }
// }

async function getProduct(params, searchParams) {
    try {
        const response = await fetch(`${process.env.API}/product/${params?.slug}${searchParams?.edition ? `?edition=${searchParams?.edition}` : ''}`)
        if (response.ok) {
            const data = await response.json()
            return data
        } else {
            throw new Error("Fetching product has failed")
        }
    } catch (error) {
        console.log(error.message)
    }

}

export default async function ProductDetailPage({ params, searchParams }) {

    const { product, selectedEdition } = await getProduct(params, searchParams)

    return (
        <>
            {product && (
                <div className="py-8">
                    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="flex flex-col md:flex-row -mx-4">
                            <div className="md:flex-1 px-4">
                                <div className="h-[460px] rounded-lg mb-4">
                                    <img className="mx-auto rounded-lg w-2/3 h-full object-center" src={selectedEdition?.image?.secure_url} alt="Product Image" />
                                </div>
                                <div className="flex -mx-2 mb-4">
                                    <AddToCart product={product} selectedEdition={selectedEdition} reviewAndCheckout={true} />
                                    <div className="w-1/2 px-2">
                                        <ProductLike product={product} />
                                    </div>
                                </div>
                            </div>
                            <div className="md:flex-1 px-4">
                                <span className="uppercase text-gray-600">{product.developer}</span>
                                <h1 className="text-2xl font-bold text-gray-800 dark:text-white mb-2">{product.title}</h1>
                                <div className="flex mb-4">
                                    <div className="mr-4">
                                        <span className="font-bold text-gray-700 dark:text-gray-300">Price:</span>
                                        <span className="text-gray-600 dark:text-gray-300"> ${selectedEdition.price.toFixed(2)}</span>
                                    </div>
                                    <div>
                                        <span className="font-bold text-gray-700 dark:text-gray-300">Availability:</span>
                                        <span className="text-gray-600 dark:text-gray-300"> {selectedEdition.stock === 0 ? "Out of Stock" : selectedEdition.stock <= 10 ? "Last 10 units" : "Available"}</span>
                                    </div>
                                </div>
                                <div className="mb-4">
                                    <span className="font-bold text-gray-700 dark:text-gray-300">Product Rating:</span>
                                    <div className="flex items-center">
                                        <ProductRating product={product} />
                                    </div>
                                </div>
                                <div className="mb-4">
                                    <span className="font-bold text-gray-700 dark:text-gray-300">Select Edition:</span>
                                    <ProductEditions product={product} selectedEdition={selectedEdition} />
                                </div>
                                <div>
                                    <span className="font-bold text-gray-700 dark:text-gray-300">Product Description:</span>
                                    <p className="text-gray-600 dark:text-gray-300 text-sm mt-2">
                                        {product?.description}
                                    </p>
                                    <p className="font-bold text-gray-700 dark:text-gray-300 mt-2">
                                        {product.main_images.length ? "Product Images:" : ""}
                                    </p>
                                    <ProductImage product={product} />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="max-w-4xl mx-auto mt-[150px]">
                        <p className="font-bold text-xl text-center uppercase">Product reviews </p>
                        <ProductReviews reviews={product.ratings} />
                    </div>
                </div>
            )}
        </>
    )
}
