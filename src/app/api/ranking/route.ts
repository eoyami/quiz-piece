import { NextResponse } from "next/server"
import { Score } from "../db/models/Score"

export async function GET() {
    const ranking = await Score.find({}).sort({ score: -1}).limit(10)

    if (!ranking) {
        return NextResponse.json({
            message: 'error'
        })
    }
    return NextResponse.json({
        data: ranking
    })
}