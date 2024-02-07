import { NextResponse } from "next/server";
import dbConnect from "@/utils/dbConnect";

const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY)

export async function POST(req){
    await dbConnect()
    const { couponCode } = await req.json()

    try {
        const coupon = await stripe.coupons.retrieve(couponCode)
        return NextResponse.json(coupon, { status: 200 })
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 })
    }
}