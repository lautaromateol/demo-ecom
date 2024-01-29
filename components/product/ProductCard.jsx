import Link from "next/link";

const ProductCard = ({ product }) => {
    return (
        <section
            className="mx-auto grid grid-cols-1 justify-items-center justify-center gap-y-20 gap-x-14 mt-10 mb-5">
            <div className="w-72 bg-white shadow-md rounded-xl duration-500 hover:scale-105 hover:shadow-xl">
                <Link href={`/product/${product?.slug}`}>
                    <img src={product?.main_images?.[0]?.secure_url}
                        alt={product?.title} className="h-80 w-72 object-center rounded-t-xl" />
                    <div className="px-4 w-full">
                        <span className="text-gray-400 mr-3 uppercase text-xs">{product?.developer}</span>
                        <p className="text-lg font-bold text-black truncate block capitalize">{product?.title}</p>
                        <div className="flex items-center">
                            <p className="text-lg font-semibold text-black cursor-auto mb-2">${product?.editions[0].price.toFixed(2)}</p>
                            <del>
                                <p className="text-sm text-gray-600 cursor-auto mb-2 ml-2">$199</p>
                            </del>
                        </div>
                        <div className="flex items-center justify-start mb-2">
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