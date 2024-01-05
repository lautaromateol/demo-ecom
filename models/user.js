import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, "Please enter your name"],
            trim: true,
            minLength: 1,
            maxLength: 30
        },
        email: {
            type: String, 
            required: true,
            index: true,
            lowercase: true,
            unique: true,
            trim: true,
            minLength: 5,
            maxLength: 40
        },
        password: {
            type: String
        },
        role: {
            type: String,
            default: "user",
        },
        image: {
            type: String
        },
        resetCode: {
            data: String,
            expiresAt: {
                type: Date,
                default: () => new Date(Date.now() + 10 * 60 * 1000)
            }
        }
    },
    { timestamps: true }
)

export default mongoose.models.User || mongoose.model("User", userSchema)