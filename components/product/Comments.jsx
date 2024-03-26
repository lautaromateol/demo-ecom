import Stars from "./Stars"

export default function Comments({ product }) {
  return (
    <section className="py-12">
      <ul>
        {product.ratings?.map((review) => (
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
    </section>
  )
}
