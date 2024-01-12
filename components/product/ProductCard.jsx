import Link from "next/link";

const ProductCard = ({ product }) => {
    return (
        <section
            className="mx-auto grid grid-cols-1 justify-items-center justify-center gap-y-20 gap-x-14 mt-10 mb-5">
            <div className="w-72 bg-white shadow-md rounded-xl duration-500 hover:scale-105 hover:shadow-xl">
                <Link href={`/product/${product?.slug}`}>
                    <img src={product?.main_images?.[0]?.secure_url}
                        alt="Product" className="h-80 w-72 object-center rounded-t-xl" />
                    <div className="px-4 py-3 w-72">
                        <span className="text-gray-400 mr-3 uppercase text-xs">{product?.developer}</span>
                        <p className="text-lg font-bold text-black truncate block capitalize">{product?.title}</p>
                        <div className="flex items-center">
                            <p className="text-lg font-semibold text-black cursor-auto my-3">${product?.editions[0].price.toFixed(2)}</p>
                            <del>
                                <p className="text-sm text-gray-600 cursor-auto ml-2">$199</p>
                            </del>
                            <div className="ml-auto">
                                <button className="bg-black px-2 py-1 uppercase text-white rounded-md">
                                    <strong>
                                        Add to Cart
                                    </strong>
                                </button>
                            </div>
                        </div>
                        <div className="flex items-center justify-start my-3">
                            <small className="bg-blue-600 text-white px-2 py-1 mr-1 rounded-full">{product?.category?.name}</small>
                            <small className="bg-red-600 text-white px-2 py-1 ml-1 rounded-full">{product?.tags?.[0]?.name}</small>
                        </div>
                    </div>
                </Link>
            </div>
        </section>

    )
}

export default ProductCard;