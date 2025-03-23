import mongoose from "mongoose";
import { Document, Schema } from "mongoose";

interface IQuiz extends Document {
    question: string,
    answer: string,
    imgUrl: string
}
const quizSchema = new Schema<IQuiz>({
    question: { type: String, required: true},
    answer: { type: String, required: true },
    imgUrl: { type: String, required: true },
})


const Quizes = mongoose.models.Quizes || mongoose.model<IQuiz>('Quizes', quizSchema) 

export default Quizes