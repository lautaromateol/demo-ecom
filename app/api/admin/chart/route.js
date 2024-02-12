import { NextResponse } from "next/server";
import dbConnect from "@/utils/dbConnect";
import Product from "@/models/product";
import Order from "@/models/order";
import User from "@/models/user";

export async function GET(req, { params }) {
    await dbConnect()

    try {
        const totalUsers = await User.countDocuments()
        const totalProducts = await Product.countDocuments()
        const totalOrders = await Order.countDocuments()
        const profit = await Order.aggregate([
            {
                $group: {
                    _id: null,
                    totalAmountReceived: { $sum: '$amount_captured' }
                }
            }
        ]);
        const totalAmountReceived = profit.length > 0 ? profit[0].totalAmountReceived : 0;
        const mostBuyed = await Order.aggregate([
            {
                $unwind: "$cartItems",
            },
            {
                $group: {
                    _id: "$cartItems._id",
                    totalQuantity: { $sum: "$cartItems.quantity" },
                },
            },
            {
                $sort: { totalQuantity: -1 },
            },
            {
                $limit: 5,
            },
        ]);
        const topProducts = await Promise.all(
            mostBuyed.map(async (item) => {
                const product = await Product.findById(item._id);
                return {
                    title: product.title,
                    quantity: item.totalQuantity,
                };
            })
        );

        return NextResponse.json({
            totalProducts,
            totalOrders,
            totalUsers,
            topProducts,
            profit: totalAmountReceived / 100
        })
    } catch (error) {
        return NextResponse.json({
            error: error.message
        },
            { status: 500 })
    }
}