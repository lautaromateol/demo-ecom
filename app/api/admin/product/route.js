import { NextResponse } from "next/server";
import dbConnect from "@/utils/dbConnect";
import Product from "@/models/product";
import slugify from "slugify";

export async function GET(req){
    await dbConnect()

    try {
        const products = await Product.find({})
        .sort({createdAt: -1})

        return NextResponse.json(products, { status: 200})

    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 })
    }

}

export async function POST(req){
    const body = await req.json()
    await dbConnect()

    try {
        const product = await Product.create({
            ...body,
            slug: slugify(body.title)
        })
        return NextResponse.json(product, { status: 200 })
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 })
    }
}