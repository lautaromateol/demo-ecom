import { NextResponse } from "next/server";
import dbConnect from "@/utils/dbConnect";
import Product from "@/models/product";
import Category from "@/models/category";
import Tag from "@/models/tag"
import queryString from "query-string";

export async function GET(req){
    await dbConnect()
    const {title} = queryString.parseUrl(req.url).query
    try {
        const [categories, tags] = await Promise.all([
            Category.find({ name: { $regex: title, $options: "i" }}),
            Tag.find({ name: { $regex: title, $options: "i" }})
        ])

        const categoryIds = categories.map((c) => c._id)
        const tagsIds = tags.map((t) => t._id)

        const productSearchResults = await Product.find({
            $or: [
                { title: { $regex: title, $options: "i" } },
                { description: { $regex: title, $options: "i" } },
                { brand: { $regex: title, $options: "i" } },
                { category: { $in: categoryIds } },
                { tags: { $in: tagsIds } },
            ]
        })
        .populate("category", "name")
        .populate("tags", "name")
        .sort({ createdAt: -1 })

        return NextResponse.json(productSearchResults)
    } catch (error) {
        return NextResponse.json({ error: "The search didn't give any results"})
}
}