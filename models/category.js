import mongoose from "mongoose";

const categorySchema = new mongoose.Schema({
    name: {
        type: String,
        trim: true,
        required: true, 
        minLength: 1,
        maxLength: 20
    },
    slug: {
        type: String,
        unique: true,
        lowercase: true,
        index: true
    },
    images: [
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
},
{timestamps: true})

export default mongoose.models.Category || mongoose.model("Category", categorySchema)