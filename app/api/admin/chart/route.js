import { NextResponse } from "next/server";
import dbConnect from "@/utils/dbConnect";
import Product from "@/models/product";
import Category from "@/models/category";
import Tag from "@/models/tag";
import Order from "@/models/order";

export async function GET(req, {params}) {
    await dbConnect()

    try {
        const totalProducts = await Product.countDocuments()
        const totalOrders = await Order.countDocuments()
        const totalCategories = await Category.countDocuments()
        const totalTags = await Tag.countDocuments()

        const data = [
            { label: "Products", count: totalProducts },
            { label: "Orders", count: totalOrders },
            { label: "Categories", count: totalCategories },
            { label: "Tags", count: totalTags }
        ]

        return NextResponse.json(data)
    } catch (error) {
        return NextResponse.json({
            error: error.message
        }, 
        { status: 500 })
    }
}