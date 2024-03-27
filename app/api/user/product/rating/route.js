import { NextResponse } from "next/server";
import dbConnect from "@/utils/dbConnect";
import Product from "@/models/product";
import Order from "@/models/order";
import { currentUser } from "@/utils/currentUser";

export async function POST(req){
    await dbConnect()
    const { productId, rating, comment } = await req.json()
    const user = await currentUser(req)

    try {
        const product = await Product.findById(productId)
        const existingRating = product.ratings.find((rate) => rate.postedBy.toString() === user._id.toString())
        const userPurchased = await Order.findOne({
            userId: user._id,
            "cartItems._id": productId
        })
        // if(!userPurchased) {
        //     return NextResponse.json({ error: "You can only leave reviews to products you have purchased."}, { status: 400 })
        // }
        if(existingRating){
            existingRating.rating = rating
            existingRating.comment = comment
            await product.save()
            return NextResponse.json(product, { status: 200 })
        }
        product.ratings.push({
            rating,
            comment,
            postedBy: user._id
        })
        const updated = await product.save()
        return NextResponse.json(updated, { status: 200 })
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 })
    }
}