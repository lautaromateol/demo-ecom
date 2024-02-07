import { NextResponse } from "next/server";
import { currentUser } from "@/utils/currentUser";
import dbConnect from "@/utils/dbConnect";
import Product from "@/models/product";
import Order from "@/models/order";

export async function GET(req) {
    await dbConnect()

    const user = await currentUser()
    const userId = user._id

    try {
        const totalOrders = await Order.countDocuments({ userId })
        const totalReviews = await Product.countDocuments({
            "ratings.postedBy": userId
        })
        const totalLikes = await Product.countDocuments({ likes: userId })
        const data = [
            {
                label: "Total Orders",
                url: "/dashboard/user/orders",
                count: totalOrders,
            },
            {
                label: "Product Reviews",
                url: "/dashboard/user/product/reviews",
                count: totalReviews,
            },
            {
                label: "Product Likes",
                url: "/dashboard/user/liked/product",
                count: totalLikes,
            },
        ];
        return NextResponse.json(data);
    } catch (error) {
        return NextResponse.json({
            error: error.message
        }, 
        {
            status: 500
        })
    }
}