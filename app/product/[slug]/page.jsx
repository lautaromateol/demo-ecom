import ProductRating from "@/components/product/ProductRating";
import RelatedProducts from "@/components/product/RelatedProducts";
import ProductImage from "@/components/product/ProductImage";
import AddToCart from "@/components/product/AddToCart";
import UserReviews from "@/components/product/UserReviewsPage";
import NewComment from "@/components/product/NewComment";
import Link from "next/link";

export async function generateMetadata({ params }) {
    const response = await fetch(`${process.env.API}/product/${params.slug}`)
    const data = await response.json()
    if (response.ok) {
        return {
            title: data.product.title,
            description: data.product.description
        }
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
}

const ProductDetailPage = async ({ params }) => {

    const data = await getProducts(params.slug)
    const { product, relatedProducts } = data

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
        <section className="py-6 md:py-12 px-6 lg:px-0">
            <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8">
                <img className="w-full lg:w-3/4 justify-self-center rounded-lg" src={product.main_images[0]?.secure_url} alt="Product Image" />
                <div>
                    <span className="inline-block text-sm font-light tracking-wider text-gray-400 uppercase">Pure Decor</span>
                    <h1 className="text-5xl font-medium text-primary mb-2">{product.title}</h1>
                    <ProductRating product={product} />
                    <span className="inline-block text-2xl text-primary mb-4">${product.price.toFixed(2)}</span>
                    <div
                        className="leading-relaxed font-light text-secondary text-lg mb-6"
                        dangerouslySetInnerHTML={{ __html: product.description }}
                    />
                    <AddToCart product={product} display={"productPage"} />
                </div>
            </div>
            <RelatedProducts products={relatedProducts} />
            <UserReviews product={product} />
            <NewComment product={product} />
        </section>
    )
}

export default ProductDetailPage;
