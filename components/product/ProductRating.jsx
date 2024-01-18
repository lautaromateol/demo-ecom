"use client"
import { useState, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import { useProductContext } from "@/context/ProductContext";
import { useSession } from "next-auth/react";
import { calculateAverageRating } from "@/utils/helpers";
import { FaStar, FaRegStar } from "react-icons/fa";
import toast from "react-hot-toast";
import Stars from "./Stars";
import Modal from "../Modal";

const ProductRating = ({ product }) => {

    const { showRatingModal, setShowRatingModal, currentRating, setCurrentRating, comment, setComment } = useProductContext()

    const [productRatings, setProductRatings] = useState(product?.ratings || [])

    const [averageRating, setAverageRating] = useState(0)

    const { data, status } = useSession()

    const router = useRouter()
    const pathname = usePathname()

    const alreadyRated = productRatings?.find((rate) => rate?.postedBy?._id === data?.user?._id)

    useEffect(() => {
        if (alreadyRated) {
            setCurrentRating(alreadyRated?.rating)
            setComment(alreadyRated?.comment)
        } else {
            setCurrentRating(0)
            setComment("")
        }
    }, [alreadyRated])

    useEffect(() => {
        if (productRatings) {
            const average = calculateAverageRating(productRatings)
            setAverageRating(average)
        }
    }, [product?.ratings])

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
                setShowRatingModal(false)
                toast.success("Thanks for leaving a rating")
                window.location.reload()
            } else {
                toast.error("Error leaving a rating")
            }
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div className="flex space-x-2">
            <div className="flex items-center">
                <Stars rating={averageRating} />
                <small className="text-gray-500"> ({productRatings?.length})</small>
            </div>
            <small onClick={() => setShowRatingModal(true)} className="cursor-pointer">
                {alreadyRated ? "Update your rating" : "Leave a rating"}
            </small>
            {showRatingModal && (
                <Modal>
                    <textarea
                        type="text"
                        cols={50}
                        rows={5}
                        className="border outline-none p-2 mb-3"
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
                                        ratingValue <= currentRating ? "text-yellow-300 text-2xl" : "text-gray-300 text-2xl"
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
                </Modal>
            )}
        </div>

    );
}

export default ProductRating;