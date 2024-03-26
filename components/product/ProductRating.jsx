"use client";
import { useState, useEffect } from "react";
import { calculateAverageRating } from "@/utils/helpers";
import Stars from "./Stars";

const ProductRating = ({ product }) => {

    const [averageRating, setAverageRating] = useState(0)

    useEffect(() => {
        if (product?.ratings) {
            const average = calculateAverageRating(product?.ratings)
            setAverageRating(average)
        }
    }, [product?.ratings])


    return (
        <div className="flex space-x-2 mb-4">
            <div className="flex space-x-2 items-center">
                <Stars rating={averageRating} />
                <small className="text-primary"> ({product?.ratings.length})</small>
            </div>
        </div>

    );
}

export default ProductRating;
