import { NextResponse } from "next/server";
import dbConnect from "@/utils/dbConnect";
import Product from "@/models/product";
import queryString from "query-string";

export async function GET(req, {params}){
    await dbConnect()
    const { edition } = queryString.parseUrl(req.url).query || ""

    try {
       const product = await Product.findOne({
        slug: params.slug
       })
       .populate({
        path: "ratings.postedBy",
        model: "User",
        select: "name"
       })
       if(!edition) {
        const selectedEdition = product.editions[0]
        return NextResponse.json({
            product,
            selectedEdition
           }, { status: 200 }) 
       }
       const selectedEdition = product.editions.filter((el) => el.slug === edition)[0]
       return NextResponse.json({
        product,
        selectedEdition
       }, { status: 200 }) 
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 200 })
    }
}

