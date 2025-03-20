import { NextRequest, NextResponse} from "next/server";
import { put } from "@vercel/blob";
import dotenv from "dotenv"
import { Quizes } from "../db/models/Quizes";
import connectDB from "../db/connectDB";

dotenv.config()

export async function POST(request: NextRequest) {
    const formData = await request.formData();
    const question = formData.get('question')?.toString()
    const file = formData.get('file')
    
    if (!question) {
        throw new Error("Question is required");
    }
    if (!file) {
        throw new Error("File is required");
    }


    const url = new URL(request.url, `http://${request.headers.get('host')}`);

    const searchParams = new URLSearchParams(url.search)
    const filename = searchParams.get('filename')
    if (!filename) {
        throw new Error("Filename is required");
    }
    if (!request.body) {
        throw new Error("Request body is required");
    }
    await connectDB()

    const blob = await put(filename, request.body, { access: 'public', token: process.env.BLOB_READ_WRITE_TOKEN });

    await Quizes.create({
        question: question,
        img: blob.url,
    })
    
    return NextResponse.json(blob)
}