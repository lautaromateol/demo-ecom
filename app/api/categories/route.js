import { NextResponse } from "next/server";
import dbConnect from "@/utils/dbConnect";
import Category from "@/models/category";

export const revalidate = 3600; 

export async function GET(req){
    await dbConnect()

    try {
        const categories = await Category.find({}).sort({createdAt: 1})
        return NextResponse.json(categories, { status: 200 })
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 })
    }
}