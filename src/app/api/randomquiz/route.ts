import { NextResponse } from "next/server";
import connectDB from "../db/connectDB";
import Quizes from "../db/models/Quizes";

export async function GET() {
  await connectDB()

        const randomQuiz = await Quizes.aggregate([{
            $sample: {size: 1}
        }])
        
        if (!randomQuiz || randomQuiz.length === 0) {
            throw new Error('Nenhum quiz encontrado!');
        }
        
        const quiz = randomQuiz[0]

        if (!quiz.question || !quiz.answer || !quiz.imgUrl) {
            throw new Error('Quiz incompleto');
    }   
  return NextResponse.json(quiz);
}
