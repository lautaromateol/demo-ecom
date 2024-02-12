"use client";
import { useState, useEffect } from "react";
import ReviewsList from "@/components/admin/ReviewsList";
import toast from "react-hot-toast";

const AdminProductReviewsPage = () => {

    const [reviews, setReviews] = useState([]);

    const getReviews = async() => {
        try {
            const response = await fetch(
                `${process.env.API}/admin/product/reviews`,
                {
                    method: "GET",
                }
            );
            const data = await response.json();
            setReviews(data);
        }
        catch (error) {
            console.log(error);
            toast.error(error);
        }
    };

    const handleDelete = async (ratingId) => {
        try {
            const response = await fetch(
                `${process.env.API}/admin/product/reviews/remove`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ ratingId }),
                }
            );
            const data = await response.json();
            if (response.ok) {
                toast.success(data.message)
                window.location.reload()
            } else if (response.status === 404) {
                toast.error(data.message)
            } else {
                toast.error("Error deleting the review.")
                console.log(data.error)
            }
        } catch (error) {
            toast.error("Error deleting the review.")
            console.log(error)
        }
    }


    useEffect(() => {
        getReviews()
    }, [])

    return (
        <div className="container">
            <div className="mx-auto max-w-4xl p-4">
                <p className="text-2xl font-bold my-10">REVIEWS LIST</p>
                <ReviewsList reviews={reviews} handleDelete={handleDelete} />
            </div>
        </div>
    )
}

export default AdminProductReviewsPage;