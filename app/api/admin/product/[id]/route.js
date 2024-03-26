import { NextResponse } from "next/server";
import dbConnect from "@/utils/dbConnect";
import Product from "@/models/product";
import slugify from "slugify";

export async function PUT(req, { params }) {
    await dbConnect()
    const body = await req.json()
    const { title, price, stock, description, category, tags, main_images } = body

    try {

        if (!title || !price || !stock || !description || !category || !tags || !main_images) throw new Error("Missing properties.")

        const updatedProduct = await Product.findByIdAndUpdate(
            params.id,
            { ...body, slug: slugify(title) },
            { new: true }
        )
        return NextResponse.json(updatedProduct, { status: 200 })
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 })
    }
}

export async function DELETE(req, { params }) {
    await dbConnect()

    try {
        const deletedProduct = await Product.findByIdAndDelete(params.id)
        return NextResponse.json(deletedProduct, { status: 200 })
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 })
    }
}