import { NextResponse } from "next/server"; 
import dbConnect from "@/utils/dbConnect"; 
import Product from "@/models/product"; 

export async function POST(req) {
    await dbConnect()

    const { ratingId } = await req.json()

    try {
        const product = await Product.findOneAndUpdate(
            { "ratings._id": ratingId },
            { $pull: { ratings: { _id: ratingId } } },
            { new: true }
        )
        if(!product) {
            return NextResponse.json(
                { message: "Rating not found", success: false },
                { status: 404 }
            )
        }
        
        return NextResponse.json({
            message: "Rating removed",
            success: true
        })
    } catch (error) {
        return NextResponse.json({
            error: error.message
        },
        {
            status: 500
        })
    }
}