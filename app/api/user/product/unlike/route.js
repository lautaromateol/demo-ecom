import { NextResponse } from "next/server";
import dbConnect from "@/utils/dbConnect";
import Product from "@/models/product";
import { currentUser } from "@/utils/currentUser";

export async function PUT(req) {
    await dbConnect()

    const { productId } = await req.json()

    const user = await currentUser()

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