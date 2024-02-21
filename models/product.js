import mongoose from "mongoose";
import category from "@/models/category";
import tag from "@/models/tag"


const ratingSchema = new mongoose.Schema({
    rating: {
        type: Number,
        min: 1,
        max: 5
    },
    comment: {
        type: String,
        maxLength: 200
    },
    postedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
},
    { timestamps: true })


const productSchema = new mongoose.Schema({
    title: {
        type: String,
        trim: true,
        required: true,
        unique: true,
        maxLength: 160,
        text: true
    },
    slug: {
        type: String,
        unique: true,
        lowercase: true,
        index: true
    },
    description: {
        type: String,
        trim: true,
        required: true,
        maxLength: 2000,
        text: true
    },
    price: {
        type: Number,
        required: true,
    },
    previousPrice: {
        type: Number,
    },
    stock: {
        type: Number,
        required: true,
    },
    brand: {
        type: String,
        required: true
    },
    shipping: {
        type: Boolean,
        default: true
    },
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Category"
    },
    tags: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Tag"
        }
    ],
    main_images: [
        {
            public_id: {
                type: String,
                required: true,
                default: ""
            },
            secure_url: {
                type: String,
                required: true,
                default: ""
            }
        }
    ],
    sold: {
        type: Number,
        default: 0
    },
    likes: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        }
    ],
    ratings: [ratingSchema]
}, { timestamps: true })

export default mongoose.models.Product || mongoose.model("Product", productSchema)