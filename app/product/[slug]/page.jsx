import ProductImage from "@/components/product/ProductImage";
import ProductRating from "@/components/product/ProductRating";
import ProductCard from "@/components/product/ProductCard";
import AddToCart from "@/components/product/AddToCart";
import UserReviews from "@/components/product/UserReviewsPage";
import Link from "next/link";
import product from "@/models/product";

export async function generateMetadata({ params }) {
    const response = await fetch(`${process.env.API}/product/${params.slug}`, {
        next: { revalidate: 0 }
    })
    const data = await response.json()
    if (response.ok) {
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
                    <Link href='/shop' className="px-4 py-2 bg-main rounded-lg text-white">
                        CONTINUE SHOPPING
                    </Link>
                </div>
            </div>
        )
    }

    return (
        <section className="py-12">
            <div className="max-w-7xl mx-auto grid grid-cols-2 gap-8">
                <img className="w-3/4 justify-self-center" src={product.main_images[0]?.secure_url} alt="Product Image" />
                <div>
                    <span className="inline-block text-sm font-light tracking-wider text-gray-400 uppercase">Pure Decor</span>
                    <h1 className="text-5xl font-medium text-primary mb-2">{product.title}</h1>
                    <ProductRating product={product}/>
                    <span className="inline-block text-2xl text-primary mb-4">${product.price.toFixed(2)}</span>
                    <p className="leading-relaxed font-light text-secondary text-lg mb-6">{product.description}</p>
                    <AddToCart product={product} display={"productPage"}/>
                </div>
            </div>
        </section>
    )
}

export default ProductDetailPage;
