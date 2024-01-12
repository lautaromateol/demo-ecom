import { NextResponse } from "next/server";
import dbConnect from "@/utils/dbConnect";
import Edition from "@/models/edition";

export async function PUT(req, {params}){
    await dbConnect()
    const body = await req.json()

    try {
        const updatedEdition = await Edition.findByIdAndUpdate(
            params.id,
            {...body},
            { new: true }
        )
        return NextResponse.json(updatedEdition, { status: 200 })
    } catch (error) {
        return NextResponse.json({ error: "Server error. Please try again." }, { status: 500 })
    }
}

export async function DELETE(req, {params}){
    await dbConnect()

    try {
        const deletedEdition = await Edition.findByIdAndDelete(
            params.id
        )
        return NextResponse.json(deletedEdition, { status: 200 })
    } catch (error) {
        return NextResponse.json({ error: "Server error. Please try again." }, { status: 500 })
    }
}