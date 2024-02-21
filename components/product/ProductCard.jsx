import Link from "next/link";
import Stars from "./Stars";
import { calculateAverageRating } from "@/utils/helpers";
import AddToCart from "./AddToCart";

const ProductCard = ({ product }) => {
    return (
        <div className="relative mx-auto flex w-full h-90 max-w-xs flex-col overflow-hidden bg-white">
            <div className="w-full relative flex h-2/3 overflow-hidden rounded-xl">
                <Link href={`/product/${product.slug}`}>
                    <img className="w-full object-center transition transform ease-in-out hover:cursor-pointer hover:scale-110" src={product.main_images[0].secure_url} alt="product image" />
                </Link>
                {
                    product.previousPrice && product.previousPrice > product.price &&
                    <span className="absolute top-0 left-0 m-2 rounded-full bg-red-500 px-2 text-center text-sm font-medium text-white">
                        {(((product.previousPrice - product.price) / product.previousPrice) * 100).toFixed(1)}% OFF
                    </span>
                }
            </div>
            <div className="mt-4 px-5">
                <Link href={`/product/${product.slug}`}>
                    <h4 className="text-xl tracking-tight text-slate-900">{product.title}</h4>
                </Link>
                <div className="mt-2 mb-5 flex items-center justify-between">
                    <p>
                        <span className="text-3xl text-slate-900">${product.price}</span>
                        {
                            product.previousPrice && product.previousPrice > product.price &&
                            <span className="text-sm text-slate-900 line-through">{product.previousPrice}</span>
                        }
                    </p>
                    <div className="flex items-center">
                        <Stars rating={calculateAverageRating(product.ratings)} />
                        <span className="mr-2 ml-3 rounded bg-yellow-200 px-2.5 py-0.5 text-xs font-semibold">{calculateAverageRating(product.ratings) > 0 ? calculateAverageRating(product.ratings)?.toFixed(1) : 0}</span>
                    </div>
                </div>
                <AddToCart card={true} product={product} reviewAndCheckout={true} />
            </div>
        </div>
    )
}

export default ProductCard;