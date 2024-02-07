import { NextResponse } from "next/server";
import { currentUser } from "@/utils/currentUser";
import dbConnect from "@/utils/dbConnect";
import Product from "@/models/product";
import queryString from "query-string";

export async function GET(req) {
    await dbConnect()

    const user = await currentUser()
    const { page } = queryString.parseUrl(req.url).query
    const pageSize = 6

    try {
        const currentPage = Number(page) || 1
        const skip = (currentPage - 1) * pageSize

        const reviews = await Product.aggregate([
            {
              $match: {
                "ratings.postedBy": user._id,
              },
            },
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
              $project: {
                _id: 0,
                product: {
                  title: 1,
                  slug: 1,
                  price: 1,
                  image: { $arrayElemAt: ["$product.images.secure_url", 0] },
                },
                // ratings: {
                //   $arrayElemAt: ["$ratings", 0], // Extract the first rating from the array
                // },
                ratings: {
                  // this is to send rating of the current user only for given product
                  $arrayElemAt: [
                    {
                      $filter: {
                        input: "$ratings",
                        as: "rating",
                        cond: { $eq: ["$$rating.postedBy", user._id] },
                      },
                    },
                    0,
                  ],
                },
              },
            },
            {
              $sort: { createdAt: -1 }, // Sort by createdAt field in descending order
            },
            {
              $skip: skip,
            },
            {
              $limit: pageSize,
            },
          ]);
      
          const totalRatings = await Product.aggregate([
            {
              $match: {
                "ratings.postedBy": user._id,
              },
            },
            {
              $group: {
                _id: null,
                totalRatings: { $sum: { $size: "$ratings" } },
              },
            },
          ]);
      
          const totalUserRatings =
            totalRatings.length > 0 ? totalRatings[0].totalRatings : 0;
      
          console.log("totalUserRatings => ", totalUserRatings);
      
          return NextResponse.json(
            {
              reviews,
              totalRatings: totalUserRatings,
              currentPage,
              totalPages: Math.ceil(totalUserRatings / pageSize),
            },
            { status: 200 }
          );
    } catch (error) {
        return NextResponse.json({
            error: error.message
        },
        {
            status: 500
        })
    }
}
