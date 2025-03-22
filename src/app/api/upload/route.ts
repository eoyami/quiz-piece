import { put } from "@vercel/blob"
import { NextResponse, NextRequest } from "next/server"
import dotenv from "dotenv"
import { Quizes } from "../db/models/Quizes"

dotenv.config()

export async function POST(req: NextRequest) {
    try {
        const { searchParams } = new URL(req.url)

        const filename = searchParams.get('filename')

        const formData = await req.formData()
        const question = formData.get('question') as string
        const file = formData.get('file') as File
        
        if (!filename) {
            return NextResponse.json({ error: 'Filename is required' }, { status: 400 });
        }

        if (!question) {
            return NextResponse.json({ error: 'Question is required' }, { status: 400 });
        }

        if (!file) {
            return NextResponse.json({ error: 'File is required' }, { status: 400 });
        }

        const blob = await put(filename, file, {
            access: "public",
            token: process.env.BLOB_READ_WRITE_TOKEN
        })

        console.log('Blob URL:', blob.url + 'Question: ', question);

        if (!blob.url) {
        throw new Error('A URL do Blob não foi gerada corretamente.');
        }

        await Quizes.create({
            question: question,
            imgUrl: blob.url
        })
    } catch (error) {
        console.error('Erro ao processar a requisição:', error);
        return NextResponse.json({ error: 'Failed to process request' }, { status: 500 });

    }
    return NextResponse.json({ message: "Enviado com sucesso" }, {status: 201})

}