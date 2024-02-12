import { NextResponse } from "next/server";
import dbConnect from "@/utils/dbConnect";
import Product from "@/models/product";
import queryString from "query-string";

export async function GET(req){
    await dbConnect()

    try {

        const reviews = await Product.aggregate([
            {
              $lookup: {
                from: "products", // The collection name
                localField: "_id",
                foreignField: "_id",
                as: "product",
              },
            },
            {
              $unwind: "$product", // Unwind the product array
            },
            {
              $unwind: "$ratings", // Unwind the ratings array
            },
            {
              $lookup: {
                from: "users", // The collection name for users
                localField: "ratings.postedBy",
                foreignField: "_id",
                as: "user",
              },
            },
            {
              $project: {
                _id: 0,
                product: {
                  _id: 1,
                  title: 1,
                  slug: 1,
                  price: 1,
                  image: { $arrayElemAt: ["$product.main_images.secure_url", 0] },
                },
                ratings: {
                  rating: "$ratings.rating",
                  comment: "$ratings.comment",
                  postedBy: {
                    _id: { $arrayElemAt: ["$user._id", 0] },
                    name: { $arrayElemAt: ["$user.name", 0] },
                    // Add other fields you want to include from the users collection
                  },
                  _id: "$ratings._id",
                },
              },
            },
            {
              $sort: { "ratings.createdAt": -1 }, // Sort by createdAt field in descending order
            },
          ]);
      
          return NextResponse.json(reviews,
            { status: 200 }
          );
    } catch (error) {
        return NextResponse.json({
            error: error.message
        }, {
            status: 500
        })
    }
}