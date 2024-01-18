import { NextResponse } from "next/server";
import dbConnect from "@/utils/dbConnect";
import Tag from "@/models/tag";

export async function GET(req){
    await dbConnect()

    try {
        const tagsList = await Tag.find({}).sort({ createdAt: -1})
        return NextResponse.json(tagsList, { status: 200 })
    } catch (error) {
        return NextResponse.json({ error: error.message}, { status: 500 })
    }
}