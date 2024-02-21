import ProductImage from "@/components/product/ProductImage";
import ProductRating from "@/components/product/ProductRating";
import ProductCard from "@/components/product/ProductCard";
import AddToCart from "@/components/product/AddToCart";
import UserReviews from "@/components/product/UserReviewsPage";
import Link from "next/link";

export async function generateMetadata({params}){
    const response = await fetch(`${process.env.API}/product/${params.slug}`, {
        next: { revalidate: 0 }
    })
    const data = await response.json()
    if(response.ok) {
        return {
            title: data.product.title,
            description: data.product.description
        }
    } else {
        return null
    }
}

async function getProducts(slug) {
    const response = await fetch(`${process.env.API}/product/${slug}`, {
        next: { revalidate: 0 }
    })
    const data = await response.json()
    if (response.ok) {
        return {
            product: data.product,
            relatedProducts: data.relatedProducts
        }
    }
    return {
        product: null
    }
}

const ProductDetailPage = async ({ params }) => {

    const { product, relatedProducts } = await getProducts(params.slug)

    if (!product) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="flex flex-col items-center justify-center">
                    <p className="text-2xl mb-5">Product not found!</p>
                    <Link href='/shop' className="px-4 py-2 bg-green-700 rounded-lg text-white font-bold">
                        CONTINUE SHOPPING
                    </Link>
                </div>
            </div>
        )
    }

    return (
        <div className="py-8">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col md:flex-row -mx-4">
                    <div className="md:flex-1 px-4">
                        <div className="h-[460px] rounded-lg mb-4">
                            <img className="mx-auto rounded-lg w-2/3 h-full object-cover" src={product.main_images[0]?.secure_url} alt="Product Image" />
                        </div>
                        <div className="mb-4">
                            <AddToCart product={product} reviewAndCheckout={true} />
                        </div>
                    </div>
                    <div className="md:flex-1 px-4">
                        <span className="uppercase text-gray-600">{product.developer}</span>
                        <h1 className="text-4xl font-bold text-gray-800 mb-2">{product.title}</h1>
                        <div className="flex mb-4">
                            <span className="font-bold text-gray-700 mr-2">Price:</span>
                            <div className="flex space-x-2">
                                <h4 className="text-xl">${product.price.toFixed(2)}</h4>
                                {product.previousPrice && product.previousPrice > product.price && (
                                    <h4 className="text-red-600">
                                        <del>${product.previousPrice.toFixed(2)}</del>
                                    </h4>
                                )}
                            </div>
                            <div className="mx-2">
                                <span className="font-bold text-gray-700">Availability:</span>
                                <span className="text-gray-600"> {product.stock === 0 ? "Out of Stock" : product.stock <= 10 ? "Last 10 units" : "Available"}</span>
                            </div>
                        </div>
                        <div className="mb-4">
                            <span className="font-bold text-gray-700">Product Rating:</span>
                            <div className="flex items-center">
                                <ProductRating product={product} />
                            </div>
                        </div>
                        <div>
                            <span className="font-bold text-gray-700">Product Description:</span>
                            <p className="text-gray-600 text-sm mt-2">
                                {product?.description}
                            </p>
                            <p className="font-bold text-gray-700 mt-2">
                                {product.main_images.length ? "Product Images:" : ""}
                            </p>
                            <ProductImage product={product} />
                        </div>
                    </div>
                </div>
            </div>
            <div className="max-w-4xl mx-auto mt-[150px]">
                <p className="font-bold text-xl text-center uppercase">Other products you may like </p>
                <div className="mt-5 grid grid-cols-1 md:grid-cols-3 mx-auto">
                    {relatedProducts.map((product) => (
                        <div key={product._id}>
                            <ProductCard key={product._id} product={product} />
                        </div>
                    ))}
                </div>
            </div>
            <div className="max-w-4xl mx-auto mt-[150px]">
                <p className="font-bold text-xl text-center uppercase">Product reviews </p>
                <UserReviews reviews={product.ratings} />
            </div>
        </div>
    )
}

export default ProductDetailPage;