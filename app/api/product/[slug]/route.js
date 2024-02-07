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
       .populate("category", "name")
       .populate("tags", "name")
       .populate({
        path: "ratings.postedBy",
        model: "User",
        select: "name"
       })

       const relatedProducts = await Product.find({
        $or: [
            { category: product.category },
            { tags: { $in: product.tags } }
        ],
        _id: { $ne: product._id }
       }).limit(3)

       if(!edition) {
        const selectedEdition = product.editions[0]
        return NextResponse.json({
            product,
            selectedEdition,
            relatedProducts
           }, { status: 200 }) 
       }
       const selectedEdition = product.editions.filter((el) => el.slug === edition)[0]
       return NextResponse.json({
        product,
        selectedEdition,
        relatedProducts
       }, { status: 200 }) 
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 200 })
    }
}

