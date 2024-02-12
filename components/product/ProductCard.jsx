import Link from "next/link";
import Stars from "./Stars";
import { calculateAverageRating } from "@/utils/helpers";

const ProductCard = ({ product }) => {
    return (
        <div className="relative mx-auto flex w-full h-90 max-w-xs flex-col overflow-hidden rounded-lg border border-gray-100 bg-white shadow-md">
            <div className="w-full relative flex h-2/3 overflow-hidden rounded-xl">
                <img className="w-full object-center" src={product.main_images[0].secure_url} alt="product image" />
                {
                    product.editions[0].previousPrice && product.editions[0].previousPrice > product.editions[0].price &&
                    <span className="absolute top-0 left-0 m-2 rounded-full bg-red-500 px-2 text-center text-sm font-medium text-white">
                        {(((product.editions[0].previousPrice - product.editions[0].price) / product.editions[0].previousPrice) * 100).toFixed(1)}% OFF
                    </span>
                }
            </div>
            <div className="mt-4 px-5">
                <Link href={`/product/${product.slug}`}>
                    <h5 className="text-xl font-bold tracking-tight text-slate-900">{product.title}</h5>
                </Link>
                <div className="mt-2 mb-5 flex items-center justify-between">
                    <p>
                        <span className="text-3xl text-slate-900">${product.editions[0].price}</span>
                        {
                            product.editions[0].previousPrice && product.editions[0].previousPrice > product.editions[0].price &&
                            <span className="text-sm text-slate-900 line-through">{product.editions[0].previousPrice}</span>
                        }
                    </p>
                    <div className="flex items-center">
                        <Stars rating={calculateAverageRating(product.ratings)} />
                        <span className="mr-2 ml-3 rounded bg-yellow-200 px-2.5 py-0.5 text-xs font-semibold">{calculateAverageRating(product.ratings) > 0 ? calculateAverageRating(product.ratings)?.toFixed(1) : 0}</span>
                    </div>
                </div>
                <Link href={`/product/${product.slug}`}>
                    <button className="flex w-full items-center justify-center cursor-pointer rounded-md bg-slate-900 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-gray-700 focus:outline-none focus:ring-4 focus:ring-blue-300">
                        <svg xmlns="http://www.w3.org/2000/svg" className="mr-2 h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                        </svg>
                        Add to cart
                    </button>
                </Link>
            </div>
        </div>
    )
}

export default ProductCard;