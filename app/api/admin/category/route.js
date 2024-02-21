import { NextResponse } from "next/server";
import dbConnect from "@/utils/dbConnect";
import Category from "@/models/category";
import slugify from "slugify";

export async function POST(req) {
    const { name, images } = await req.json()
    await dbConnect()

    if(!name || !images) throw new Error("Missing properties.")

    try {
        const category = await Category.create({
            name,
            slug: slugify(name),
            images
        })
        return NextResponse.json(category, { status: 200 })
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 })
    }
}

export async function GET(req){
    await dbConnect()

    try {
        const categories = await Category.find({}).sort({createdAt: -1})
        return NextResponse.json(categories, { status: 200 })
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 })
    }
}