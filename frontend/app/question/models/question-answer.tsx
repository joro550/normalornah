export enum QuestionAnswer {
    Normal = 0,
    Nah = 1
};

export type QuestionAnswerModel = {
    questionAnswer: QuestionAnswer,
    questionId: number
}
