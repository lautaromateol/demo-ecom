import { NextResponse } from "next/server";
import dbConnect from "@/utils/dbConnect";
import Product from "@/models/product";

export const revalidate = 0

export async function GET(req) {
    await dbConnect()

    try {
        const mostSold = await Product.find().sort({ sold: -1 }).limit(4)
        return NextResponse.json(mostSold)
    } catch (error) {
        return NextResponse.json({
            error: error.message
        }, {
            status: 500
        })
    }
}