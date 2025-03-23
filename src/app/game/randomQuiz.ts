import connectDB from "../api/db/connectDB";
import Quizes from "../api/db/models/Quizes";

const getRandomQuiz = async () => {
    try {
        
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
        return quiz
        
    } catch (e) {
        throw new Error("error: " + e)
    }
}

export default getRandomQuiz