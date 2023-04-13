import { QuestionModel } from "../models/question-model";

export class QuestionApi 
{
    public async getQuestion() : Promise<QuestionModel> {
        let result = await fetch('http://localhost:5101/questions/random');
        return await result.json() as QuestionModel;
    }
}
