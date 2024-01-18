import mongoose from "mongoose";
import category from "@/models/category";
import tag from "@/models/tag"

const editionSchema = new mongoose.Schema({
    console: { type: String, required: true },
    stock: { type: Number, required: true },
    price: { type: Number, required: true },
    previousPrice: String,
    image: {
        secure_url: String,
        public_id: String,
    },
    slug: {
        type: String,
        unique: true,
        lowercase: true,
        index: true
    }
});

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
    developer: String,
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
                default: ""
            },
            secure_url: {
                type: String,
                default: ""
            }
        }
    ],
    sold: {
        type: Number,
        default: 0
    },
    editions: [editionSchema],
    likes: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        }
    ],
    ratings: [ratingSchema]
}, { timestamps: true })

export default mongoose.models.Product || mongoose.model("Product", productSchema)