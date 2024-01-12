import { NextResponse } from "next/server";
import dbConnect from "@/utils/dbConnect";
import Tag from "@/models/tag";
import slugify from "slugify";

export async function PUT(req, {params}){
    await dbConnect()
    const body = await req.json()

    try {
        const updatedTag = await Tag.findByIdAndUpdate(
            params.id,
            {...body, slug: slugify(body.name)},
            { new: true }
        )
        return NextResponse.json(updatedTag, { status: 200 })
    } catch (error) {
        return NextResponse.json({ error: "Server error. Please try again." }, { status: 500 })
    }
}

export async function DELETE(req, {params}){
    await dbConnect()

    try {
        const deletedTag = await Tag.findByIdAndDelete(
            params.id
        )
        return NextResponse.json(deletedTag, { status: 200 })
    } catch (error) {
        return NextResponse.json({ error: "Server error. Please try again." }, { status: 500 })
    }
}