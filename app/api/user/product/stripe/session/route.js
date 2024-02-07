import { NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";
import dbConnect from "@/utils/dbConnect";
import Product from "@/models/product";

const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY)

export async function POST(req) {
    await dbConnect()
    const body = await req.json()
    const {user} = await getToken({ req, secret: process.env.NEXTAUTH_SECRET })

    try {
        const lineItems = await Promise.all(
            body.cartItems.map(async(item) => {
                const product = await Product.findById(item.id)
                const unitAmount = item.selectedEdition.price * 100
                return {
                    price_data: {
                        currency: "usd",
                        product_data: {
                            name: product.title,
                            images: [item.selectedEdition.image.secure_url]
                        },
                        unit_amount: unitAmount
                    },
                    tax_rates: [process.env.STRIPE_TAX_RATE],
                    quantity: item.quantity
                }
            })
        )
        const session = await stripe.checkout.sessions.create({
            success_url: `${process.env.DOMAIN}/dashboard/user/stripe/success`,
            client_reference_id: user._id,
            line_items: lineItems,
            mode: "payment",
            payment_method_types: ["card"],
            payment_intent_data: {
                metadata: {
                    cartItems: JSON.stringify(body.cartItems),
                    userId: user._id
                }
            },
            shipping_options: [
                {
                    shipping_rate: process.env.STRIPE_SHIPPING_RATE
                }
            ],
            shipping_address_collection: {
                allowed_countries: ["US"]
            },
            discounts: [ { coupon: body.couponCode } ],
            customer_email: user.email
        })
        return NextResponse.json(session)
    } catch (error) {
        return NextResponse.json({
            error: error.message
        },
            { status: 500 }
        )
    }
}