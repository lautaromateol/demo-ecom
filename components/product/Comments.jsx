"use client";
import { useProductContext } from "@/context/ProductContext";
import { useSession } from "next-auth/react";
import UpdateComment from "./UpdateComment";
import Stars from "./Stars";

export default function Comments({ product }) {

  const { data, status } = useSession()

  const { updateComment, setUpdateComment } = useProductContext()

  return (
    <section className="py-12">
      <ul>
        {product.ratings?.map((review) => {
          if (review?.postedBy?.name === data?.user?.name) {
            if (updateComment) return <UpdateComment product={product} />
            else return (
              <li className="relative my-2 shadow-md border-2 p-4" key={review?._id}>
                <div>
                  <p>
                    <strong>{review?.postedBy?.name}</strong>
                  </p>
                  <Stars rating={review.rating} />
                  {review?.comment && <p className="mt-3">{review?.comment}</p>}
                </div>
                <button onClick={() => setUpdateComment(true)} className="absolute top-2 right-2"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6 text-main">
                  <path stroke-linecap="round" stroke-linejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
                </svg>
                </button>
              </li>
            )
          } else {
            return (
              <li className="relative my-2 shadow-md border-2 p-4" key={review?._id}>
                <div>
                  <p>
                    <strong>{review?.postedBy?.name}</strong>
                  </p>
                  <Stars rating={review.rating} />
                  {review?.comment && <p className="mt-3">{review?.comment}</p>}
                </div>
              </li>
            )
          }
        })}
      </ul>
    </section>
  )
}
