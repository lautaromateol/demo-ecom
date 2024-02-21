import { NextResponse } from "next/server";
import dbConnect from "@/utils/dbConnect";
import Product from "@/models/product";
import Category from "@/models/category";
import slugify from "slugify";

export async function GET(req){
    await dbConnect()

    try {
        const products = await Product.find({})
        .sort({createdAt: -1})

        return NextResponse.json(products, { status: 200 })

    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 })
    }

}

export async function POST(req){
    const body = await req.json()
    const { title, price, stock, brand, description, category, tags, main_images, previousPrice } = body
    await dbConnect()

    try {
        if(!title || !price || !stock || !brand || !description || !category || !tags || !main_images) throw new Error("Missing properties.")
        
        const product = await Product.create({
            title: `${brand} - ${title}`,
            slug: slugify(`${brand} - ${title}`),
            price,
            stock,
            brand,
            description,
            category,
            tags,
            previousPrice,
            main_images,
        })
        return NextResponse.json(product, { status: 200 })
    } catch (error) {
        console.log(error)
        return NextResponse.json({ error: error.message }, { status: 500 })
    }
}