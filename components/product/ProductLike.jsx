"use client"
import { useState } from "react"
import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import toast from "react-hot-toast"

export default function ProductLike({ product }){

    const { data, status } = useSession()

    const [likes, setLikes] = useState(product?.likes)

    const router = useRouter()

    const isLiked = likes?.includes(data?.user?._id)

    const handleLike = async () => {
        if (status !== "authenticated") {
            toast.error("You need to have an account to like a product.")
            return
        }
        try {
            if (isLiked) {
                handleUnlike()
            } else {
                const response = await fetch(`${process.env.API}/user/product/like`, {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({ productId: product?._id })
                })
                if (!response.ok) throw new Error(`Failed to like: ${response.status} ${response.statusText}`)
                const data = await response.json()
                setLikes(data.likes)
                toast.success("Product liked")
                router.refresh()
            }
        } catch (error) {
            console.log(error.message)
            toast.error("Error liking the product")
        }
    }

    const handleUnlike = async () => {
        try {
            const options = {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ productId: product._id, })
            };
            const response = await fetch(`${process.env.API}/user/product/unlike`, options);
            if (!response.ok) {
                throw new Error(`Failed to unlike`);
            }
            const data = await response.json();
            setLikes(data.likes);
            toast.success("Product unliked");
            router.refresh();
        } catch (err) {
            console.log(err);
            toast.error("Error unliking product");
        }
    }
    return (
        <button onClick={handleLike} className="w-full bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-white py-2 px-4 rounded-full font-bold hover:bg-gray-300 dark:hover:bg-gray-600">
            {`❤️${likes?.length === 0 ? 0 : likes?.length} likes`}
        </button>
    )
}
