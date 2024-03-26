import { NextResponse } from "next/server";
import dbConnect from "@/utils/dbConnect";
import Product from "@/models/product";

export const revalidate = 0

export async function GET(req) {
  await dbConnect()

  try {
    const topRatedProducts = await Product.aggregate([
      {
        $project: {
          title: 1,
          description: 1,
          price: 1,
          slug: 1,
          previousPrice: 1,
          stock: 1,
          brand: 1,
          category: 1,
          tags: 1,
          main_images: 1,
          likes: 1,
          ratings: 1,
          averageRating: { $avg: "$ratings.rating" },
        },
      },
      { $sort: { averageRating: -1 } },
      { $limit: 6 }, 
    ]);
    return NextResponse.json(topRatedProducts)
  } catch (error) {
    return NextResponse.json({
      error: error.message
    })
  }
}