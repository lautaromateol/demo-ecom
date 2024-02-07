import { NextResponse } from "next/server";
import dbConnect from "@/utils/dbConnect";
import User from "@/models/user";
import bcrypt from "bcrypt"

export async function POST(req) {
    await dbConnect()
    const { email, password, resetCode } = await req.json()

    try {
        const user = await User.findOne({
            email,
            "resetCode.data": resetCode,
            "resetCode.expiresAt": { $gt: new Date() }
        })

        if(!user) {
            return NextResponse.json({
                error: "Invalid or expired reset code"
            }, {
                status: 400
            })
        }

        user.password = await bcrypt.hash(password, 10)
        user.resetCode = null
        await user.save()

        return NextResponse.json({
            message: "Password reset succesful. Login with your new password"
        })

    } catch (error) {
        return NextResponse.json({
            error: error.message
        }, {
            status: 500
        })
    }
}