import { put } from "@vercel/blob"
import { NextResponse, NextRequest } from "next/server"
import Quizes from "../db/models/Quizes"
import connectDB from "../db/connectDB"

export async function POST(req: NextRequest) {
    try {
        
        const { searchParams } = new URL(req.url)

        const filename = searchParams.get('filename')

        const formData = await req.formData()
        const question = formData.get('question') as string
        const file = formData.get('file') as File
        const answer = formData.get('answer') as string
        
        if (!filename) {
            return NextResponse.json({ error: 'Filename is required' }, { status: 400 });
        }

        if (!question) {
            return NextResponse.json({ error: 'Question is required' }, { status: 400 });
        }
        
        if (!answer) {
            return NextResponse.json({ error: 'Answer is required' }, { status: 400 });
        }

        if (!file) {
            return NextResponse.json({ error: 'File is required' }, { status: 400 });
        }

        const blob = await put(filename, file, {
            access: "public",
            token: process.env.BLOB_READ_WRITE_TOKEN
        })
        
        if (!blob.url) {
        throw new Error('URL inválida');
        }
        await connectDB()

        const createdQuiz = await Quizes.create({
            question: question,
            answer: answer,
            imgUrl: blob.url,
        })
        return NextResponse.json({ message: "Enviado com sucesso", data: createdQuiz }, { status: 201 })
        
    } catch (error) {
        console.error('Erro ao processar a requisição:', error);
        return NextResponse.json({ error: 'Failed to process request' }, { status: 500 });
    }


}