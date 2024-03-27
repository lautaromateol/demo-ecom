"use client";
import { useProductContext } from "@/context/ProductContext";
import { useSession } from "next-auth/react";
import { FaPencil } from "react-icons/fa6";
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
            if(updateComment) return <UpdateComment product={product} />
             else return (
                <li className="relative my-2 shadow-md border-2 p-4" key={review?._id}>
                  <div>
                    <p>
                      <strong>{review?.postedBy?.name}</strong>
                    </p>
                    <Stars rating={review.rating} />
                    {review?.comment && <p className="mt-3">{review?.comment}</p>}
                  </div>
                  <button onClick={() => setUpdateComment(true)} className="absolute top-2 right-2"><FaPencil className="text-main" /></button>
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
