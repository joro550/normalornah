import { QuestionModel } from "../models/question-model";
import { QuestionAnswerModel } from "../models/question-answer";
import { QuestionStat } from "../models/question-stats";
import { UserRepository } from "@/library/user-repository";

export class QuestionApi {
  public async getQuestion(): Promise<QuestionModel> {
    let result = await fetch("http://localhost:5101/questions/random", {
      cache: "no-cache",
    });
    return (await result.json()) as QuestionModel;
  }

  public async pushStat(
    questionId: number,
    questionAnswer: QuestionAnswerModel
  ): Promise<boolean> {
    console.log(`https://localhost:5101/questions/${questionId}/stat`);
    let userId = UserRepository.getUser();
    let result = await fetch(
      `http://localhost:5101/questions/${questionId}/stat`,
      {
        method: "post",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          userId: userId,
        },
        body: JSON.stringify(questionAnswer),
      }
    );
    return result.ok;
  }

  public async getStats(questionId: number): Promise<QuestionStat> {
    let result = await fetch(
      `http://localhost:5101/questions/${questionId}/stat`,
      {
        cache: "no-cache",
      }
    );
    return (await result.json()) as QuestionStat;
  }

  public async submitQuestion() {
    let result = await fetch('https://localhost:5101/question',
      { 
        method : 'post',
        headers:{
          Accept: 'application/json',
          "Content-Type": "application/json"
        },
        body : JSON.stringify({})
      })
    return result.ok;
  }
}
