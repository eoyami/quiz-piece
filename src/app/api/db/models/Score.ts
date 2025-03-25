import mongoose, { Document, Schema } from "mongoose";


interface IScore extends Document{
    username: string,
    score: number
}


const scoreSchema = new Schema<IScore>({
    username: { type: String, required: true },
    score: { type: Number, required: true}
})


export const Score = mongoose.models.Score || mongoose.model('Scores', scoreSchema)