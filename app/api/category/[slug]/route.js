import { NextResponse } from "next/server";
import dbConnect from "@/utils/dbConnect";
import Category from "@/models/category";
import Product from "@/models/product";
import queryString from "query-string";

export async function GET(req, { params }) {
    await dbConnect()
    const slug = params.slug
    const searchParams = queryString.parseUrl(req.url).query
    const { page, tag, brand, ratings, minPrice, maxPrice } = searchParams || {}
    const pageSize = 6
    const filter = {}
    
    if(brand){
        filter.brand = brand
    }
    if(tag){
        filter.tags = tag
    }
    if(minPrice && maxPrice){
        filter.price = {
            $gte: minPrice,
            $lte: maxPrice
        }
    }

    try {
        const currentPage = Number(page) || 1
        const skip = (currentPage - 1) * pageSize

        const category = await Category.findOne({ slug })
        filter.category = category._id
        const allProducts = await Product.find(filter)
        .populate("category", "name")
        .populate("tags", "name")
        .sort({createdAt: -1})

        const calculateAverageRating = (ratings)=> {
            if(ratings.length === 0) return 0
            let totalRating = 0
            ratings.forEach((rating) => totalRating += rating.rating)
            return totalRating / ratings.length
        }

        const productsWithAverageRating = allProducts.map((product) => ({
            ...product.toObject(),
            averageRating: calculateAverageRating(product.ratings)
        }))

        const filteredProducts = productsWithAverageRating.filter((product)=> {
            if(!ratings) {
                return true
            }
            const targetRating = Number(ratings)
            const difference = product.averageRating - targetRating
            return difference >= -0.5 && difference <= 0.5
        })

        const totalFilteredProducts = filteredProducts.length;
        const paginatedProducts = filteredProducts.slice(skip, skip + pageSize)

        return NextResponse.json({
            category,
            products: paginatedProducts,
            currentPage,
            totalPages: Math.ceil( totalFilteredProducts / pageSize )
        })

    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 })
    }
}
