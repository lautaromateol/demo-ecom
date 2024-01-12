import { NextResponse } from "next/server";
import dbConnect from "@/utils/dbConnect";
import Product from "@/models/product";
import queryString from "query-string";

export async function GET(req){
    await dbConnect()
    // http://localhost:3000/api/product?page=3
    const {page} = queryString.parseUrl(req.url).query || {} // "3"

    const pageSize = 6

    try {
        const currentPage = Number(page) || 1
        const skip = (currentPage - 1) * pageSize
        const totalProducts = await Product.countDocuments({})

        const products = await Product.find({})
        .populate("category", "name slug")
        .populate("tags", "name slug")
        .skip(skip)
        .limit(pageSize)
        .sort({createdAt: -1})

        return NextResponse.json({
            products,
            currentPage,
            totalPages: Math.ceil(totalProducts / pageSize)
        },
        { status: 200 }
        )

    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 })
    }

}