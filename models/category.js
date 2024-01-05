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
},
{timestamps: true})

export default mongoose.models.Category || mongoose.model("Category", categorySchema)