import Comments from "./Comments"
import RatingDistribution from "./RatingDistribution"

export default function UserReviews({ product }) {
    return (
        <section className="py-24">
            <div className="max-w-7xl mx-auto">
            <h3 className="text-lg text-main font-medium uppercase tracking-wider mb-4">User reviews</h3>
                {product.ratings?.length ? (
                    <>
                        <RatingDistribution reviews={product?.ratings} />
                        <Comments product={product}/>
                    </>
                ) : <RatingDistribution />
                }
            </div>

        </section>
    )
}
