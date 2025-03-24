import { NextResponse, NextRequest } from "next/server";
import { Score } from "../db/models/Score";

export async function POST(req: NextRequest) {
    try {

        const { username, score } = await req.json()

        const scoreExist = await Score.findOne({ username })

        if (!scoreExist) {

            const newScore = await Score.create({
                username: username,
                score: score
            })
            return NextResponse.json({
                message: 'Score enviado',
                data: newScore
            }, {status: 201})
        }

        if (score > scoreExist.score) {
            const updateScore = await Score.findOneAndUpdate(
                { _id: scoreExist._id },
                { $set: { score: score } },
                {new: true}
            )
            return NextResponse.json({
                message: 'Máximo score enviado',
                data: updateScore
            }, {status: 200})
        }
        //menor ou igual
        return NextResponse.json({
            message: 'Score não atualizado (o existente é maior ou igual)',
            data: scoreExist
        }, {status: 200})

    } catch (e) {
        return NextResponse.json({
            message: 'error',
            data: e
        }, { status: 400})
    }
}