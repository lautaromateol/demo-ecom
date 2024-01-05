import { NextResponse } from "next/server";
import dbConnect from "@/utils/dbConnect";
import Category from "@/models/category";
import slugify from "slugify";

export async function PUT(req, {params}){
    await dbConnect()
    const body = await req.json()

    try {
        const updatedCategory = await Category.findByIdAndUpdate(
            params.id,
            { ...body, slug: slugify(body.name) },
            { new: true}
        )
        return NextResponse.json(updatedCategory, { status: 200 })
    } catch (error) {
        return NextResponse.json({ error: error.message}, { status: 500 })
    }
}

export async function DELETE(req, {params}){
    await dbConnect()
    
    try {
        const deletedCategory = await Category.findByIdAndDelete(
            params.id   
        )
        return NextResponse.json(deletedCategory, { status: 200 })
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 })
    }
}