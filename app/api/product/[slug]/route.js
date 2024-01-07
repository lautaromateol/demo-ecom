import { NextResponse } from "next/server";
import dbConnect from "@/utils/dbConnect";
import Product from "@/models/product";

export async function GET(req, {params}){
    await dbConnect()

    try {
       const product = await Product.findOne({
        slug: params.slug
       })
       return NextResponse.json(product, { status: 200 }) 
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 200 })
    }
}

