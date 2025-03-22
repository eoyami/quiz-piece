import mongoose from "mongoose";


const quizSchema = new mongoose.Schema({
    question: {
        type: String,
        required: true
    },
    imgUrl: {
        type: String,
        required: true 
    }
})



export const Quizes = mongoose.models.Quizes || mongoose.model('Quizes', quizSchema) 