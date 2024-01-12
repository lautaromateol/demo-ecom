import { NextResponse } from "next/server";
import dbConnect from "@/utils/dbConnect";
import Edition from "@/models/edition";

export async function POST(req){
    const {console} = await req.json()
    await dbConnect()

    try {
        const edition = await Edition.create({
            console,
        })
        return NextResponse.json(edition, { status: 200 })
    } catch (error) {
        return NextResponse.json({ error: error.message}, { status: 500 })
    }
}

export async function GET(req){
    await dbConnect()

    try {
        const editionsList = await Edition.find({}).sort({ createdAt: -1})
        return NextResponse.json(editionsList, { status: 200 })
    } catch (error) {
        return NextResponse.json({ error: error.message}, { status: 500 })
    }
}