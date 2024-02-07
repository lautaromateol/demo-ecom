"use client";
import { useState, useEffect } from "react";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import ProductReviews from "@/components/product/ProductReviews";
import Pagination from "@/components/product/Pagination";
import toast from "react-hot-toast";

const UserProductReviewsPage = () => {

    const [reviews, setReviews] = useState([])
    const [totalRatings, setTotalRatings] = useState(0)

    const [currentPage, setCurrentPage] = useState(1)
    const [totalPages, setTotalPages] = useState(1)
    const [loading, setLoading] = useState(true)

    const pathname = usePathname()
    const searchParams = useSearchParams()
    const page = searchParams.get("page")

    const router = useRouter()

    const getReviews = async (page) => {
        try {
            const response = await fetch(`${process.env.API}/user/product/reviews?page=${page}`, {
                method: "GET"
            })
            const data = await response.json()
            if (response.ok) {
                setReviews(data.reviews)
                setCurrentPage(data.currentPage)
                setTotalPages(data.totalPages)
                setTotalRatings(data.totalRatings)
                setLoading(false)
            } else {
                setLoading(false)
                console.log(data.error)
                toast.error("Error fetching the reviews. Try again later.")
            }
        } catch (error) {
            console.log(error)
            toast.error("Error fetching the reviews. Try again.")
        }
    }

    useEffect(() => {
        getReviews(page)
    }, [page])

    return (
        <>
            {
                loading ?
                    <div className="flex items-center justify-center min-h-screen text-red-900">
                        LOADING
                    </div>
                    :
                    <>
                        {reviews ?
                            <div className="container">
                                <div className="mx-auto max-w-4xl p-4">
                                    <p className="text-medium">
                                        Product Reviews ({totalRatings})
                                    </p>
                                    <hr className="w-full mb-5"/>
                                    <ProductReviews reviews={reviews} />
                                    <Pagination
                                        currentPage={currentPage}
                                        totalPages={totalPages}
                                        pathname={pathname}
                                    />
                                </div>
                            </div>
                            :
                            <div className="flex justify-center items-center text-red-500 min-h-screen">
                                No Reviews
                            </div>
                        }
                    </>

            }
        </>
    )
}

export default UserProductReviewsPage;