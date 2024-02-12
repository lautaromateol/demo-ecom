import { NextResponse } from "next/server";
import dbConnect from "@/utils/dbConnect";
import User from "@/models/user";

export async function GET(req) {
    await dbConnect()

    try{
        const users = await User.find()
        return NextResponse.json(users)

    } catch(error) {
        return NextResponse.json({
            error: error.message
        }, {
            status: 500
        })
    }
}