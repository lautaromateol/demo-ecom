import Link from "next/link";
import Stars from "./Stars";

const ProductReviews = ({ reviews, handleDelete }) => {
    return (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {reviews.map((review, index) => (
                <div className="lg:col-span-1 bg-slate-100 rounded-lg overflow-hidden shadow-md">
                    <div className="lg:col-span-1 p-4">
                        <h5 className="card-title text-xl font-semibold mb-2">
                            <Link
                                href={`/product/${review?.product?.slug}`}
                                as={`/product/${review?.product?.slug}`}
                            >
                                {review?.product?.title}
                            </Link>
                        </h5>
                        <div className="flex justify-between items-center mb-2">
                            <div>
                                <Stars rating={review?.ratings?.rating} />
                            </div>
                            {handleDelete && (
                                <button
                                    className="bg-red-500 text-white px-4 py-2 rounded-full"
                                    onClick={() => handleDelete(review?.ratings?._id)}
                                >
                                    X
                                </button>
                            )}
                        </div>
                        {review?.ratings?.comment && (
                            <p className="card-text mb-2">{review?.ratings?.comment}</p>
                        )}
                        {review?.ratings?.postedBy?.name && (
                            <p className="text-gray-500">
                                {review?.ratings?.postedBy?.name}
                            </p>
                        )}
                    </div>
                </div>
            ))}
        </div>


    )
}

export default ProductReviews;

