import { NextResponse } from "next/server";
import dbConnect from "@/utils/dbConnect";
import Product from "@/models/product";

export const revalidate = 0

export async function GET(req, { params }) {
    await dbConnect()

    try {
        const product = await Product.findOne({
            slug: params.slug
        })
            .populate("category", "name")
            .populate("tags", "name")
            .populate({
                path: "ratings.postedBy",
                model: "User",
                select: "name"
            })

        const relatedProducts = await Product.find({
            $or: [
                { category: product.category },
                { tags: { $in: product.tags } }
            ],
            _id: { $ne: product._id }
        }).limit(3)

        return NextResponse.json({
            product,
            relatedProducts
        }, { status: 200 })

    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 })
    }
}

