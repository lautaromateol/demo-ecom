import { NextResponse } from "next/server";
import dbConnect from "@/utils/dbConnect";
import Product from "@/models/product";
import Order from "@/models/order";
import User from "@/models/user";

export async function GET(req) {
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

        return NextResponse.json({
            totalProducts,
            totalOrders,
            totalUsers,
            profit: totalAmountReceived / 100
        })
    } catch (error) {
        return NextResponse.json({
            error: error.message
        },
            { status: 500 })
    }
}