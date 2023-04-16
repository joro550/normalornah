import { QuestionModel } from "../models/question-model";
import { QuestionAnswer } from "../models/question-answer";
import { QuestionStat } from "../models/question-stats";

export class QuestionApi {
  public async getQuestion(): Promise<QuestionModel> {
    let result = await fetch("http://localhost:5101/questions/random", {
      cache: "no-cache",
    });
    return (await result.json()) as QuestionModel;
  }

  public async pushStat(
    questionId: number,
    questionAnswer: QuestionAnswer
  ): Promise<boolean> {
    let result = await fetch(
      `http://localhost:5101/questions/${questionId}/stat`,
      {
        method: "post",
        headers: {
          "Content-Type": "application/json",
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
}
