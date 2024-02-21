import RatingDistribution from "./RatingDistribution"
import Stars from "./Stars"

export default function UserReviews({ reviews }) {
    return (
        <>
            {reviews?.length ? (
                <div className="mt-5">
                    <RatingDistribution reviews={reviews} />
                    <ul className="mt-4 p-4">
                        {reviews?.map((review) => (
                            <li className="my-2 shadow-md border-2 p-4" key={review?._id}>
                                <div>
                                    <p>
                                        <strong>{review?.postedBy?.name}</strong>
                                    </p>
                                    <Stars rating={review.rating} />
                                    {review?.comment && <p className="mt-3">{review?.comment}</p>}
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
            ) : <RatingDistribution />
            }
        </>
    )
}
