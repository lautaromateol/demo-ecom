import { NextResponse } from "next/server";
import dbConnect from "@/utils/dbConnect";
import User from "@/models/user";
import bcrypt from "bcrypt"

export async function POST(req){
    const {name, email, password} = await req.json()

    await dbConnect()

    try {
        const user = await User.findOne({email})
        if(user) throw new Error("This email is already registered")
        await new User({
            name,
            email,
            password: await bcrypt.hash(password, 10)
        }).save()
        return NextResponse.json({success: "User registered successfully"}, {status: 200})
    } catch (error) {
        return NextResponse.json( {error: error.message}, {status: 500})
    }
}