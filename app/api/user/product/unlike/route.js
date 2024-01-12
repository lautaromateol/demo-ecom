import { NextResponse } from "next/server";
import dbConnect from "@/utils/dbConnect";
import Product from "@/model/product";
import { getToken } from "next-auth/jwt";

export async function PUT(req) {
    await dbConnect()

    const { productId } = await req.json()

    const { user } = await getToken({
        req,
        secret: process.env.NEXTAUTH_SECRET
    })

    try {
        const updated = await Product.findByIdAndUpdate(productId,
            {
                $pull: { likes: user._id }
            },
            { new: true }
            )
        return NextResponse.json(updated, { status: 200 })
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 })
    }
}