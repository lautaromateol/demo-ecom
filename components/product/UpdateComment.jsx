import { useRouter, usePathname } from "next/navigation";
import { useSession } from "next-auth/react";
import { useProductContext } from "@/context/ProductContext";
import { useState, useEffect } from "react";
import { FaStar, FaRegStar } from "react-icons/fa";
import toast from "react-hot-toast";


export default function NewComment({product}) {

  const { currentRating, setCurrentRating, comment, setComment } = useProductContext()

  const router = useRouter()
  const pathname = usePathname()

  const { data, status } = useSession()

  const [productRatings, setProductRatings] = useState(product?.ratings || [])

  const alreadyRated = productRatings?.find((rate) => rate?.postedBy?._id === data?.user?._id)

  const submitRating = async () => {
    if (status !== "authenticated") {
      toast.error("You must be logged in to leave a rating.")
      router.push(`/login?callbackUrl=${pathname}`)
      return
    }
    try {
      const response = await fetch(`${process.env.API}/user/product/rating`, {
        method: "POST",
        body: JSON.stringify({
          productId: product?._id,
          rating: currentRating,
          comment
        })
      })
      const data = await response.json()
      if (response.ok) {
        setProductRatings(data?.ratings)
        toast.success("Thanks for leaving a rating.")
        window.location.reload()
      } else if (response.status === 400) {
        toast.error(data.error)
      } else {
        toast.error("An error has ocurred leaving the rating. Please try again later.")
      }
    } catch (error) {
      toast.error("Server error. Please try again later.")
    }
  }

  useEffect(() => {
    if (alreadyRated) {
      setCurrentRating(alreadyRated?.rating)
      setComment(alreadyRated?.comment)
    } else {
      setCurrentRating(0)
      setComment("")
    }
  }, [alreadyRated])

  return (
    <section>
          <textarea
            type="text"
            cols={50}
            rows={5}
            className="border outline-none w-full p-2 mb-3"
            placeholder="Write a review"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          ></textarea>
          <div className="flex cursor-pointer space-x-1">
            {[...Array(5)].map((_, index) => {
              const ratingValue = index + 1;
              return (
                <span
                  key={ratingValue}
                  className={
                    ratingValue <= currentRating ? "text-primary text-2xl" : "text-secondary text-2xl"
                  }
                  onClick={() => setCurrentRating(ratingValue)}
                >
                  {ratingValue <= currentRating ? (
                    <FaStar />
                  ) : (
                    <FaRegStar />
                  )}
                </span>
              );
            })}
          </div>
          <button
            onClick={submitRating}
            className="bg-blue-500 text-white px-4 py-2 mt-3 rounded-full font-bold"
          >
            Submit
          </button>
    </section>
  )
}
