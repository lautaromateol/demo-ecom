import RatingDistribution from "./RatingDistribution"
import Stars from "./Stars"

export default function ProductReviews({reviews}) {
  return (
    <>
    {reviews?.length ? (
        <div>
            <RatingDistribution reviews={reviews}/>
            <ul className="mt-4 bg-white">
                {reviews?.map((review) => (
                    <li className="my-2 shadow-md border-2 p-4" key={review._id}>
                        <div>
                            <p>
                                <strong>{review.postedBy.name}</strong>
                            </p>
                            <Stars rating={review.rating}/>
                            {review?.comment && <p className="mt-3">{review.comment}</p>}
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    ) : (<p>No reviews yet.</p>)}
    </>
  )
}
