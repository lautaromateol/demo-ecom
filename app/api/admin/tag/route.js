import { NextResponse } from "next/server";
import dbConnect from "@/utils/dbConnect";
import Tag from "@/models/tag";
import slugify from "slugify";

export async function POST(req){
    const {name, parent} = await req.json()
    await dbConnect()

    try {
        const tag = await Tag.create({
            name,
            parent,
            slug: slugify(name)
        })
        return NextResponse.json(tag, { status: 200 })
    } catch (error) {
        return NextResponse.json({ error: error.message}, { status: 500 })
    }
}

export async function GET(req){
    await dbConnect()

    try {
        const tagsList = await Tag.find({}).sort({ createdAt: -1})
        return NextResponse.json(tagsList, { status: 200 })
    } catch (error) {
        return NextResponse.json({ error: error.message}, { status: 500 })
    }
}