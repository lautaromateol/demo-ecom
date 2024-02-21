import { NextResponse } from "next/server";
import dbConnect from "@/utils/dbConnect";
import Product from "@/models/product"

export async function GET(req) { 
    await dbConnect()

    try {
        const brands = await Product.distinct("brand")
        return NextResponse.json(brands)
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 })
    }
}