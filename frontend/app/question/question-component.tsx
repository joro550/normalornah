"use client";

import { useRouter } from "next/navigation";
import { QuestionAnswer } from "./models/question-answer";
import { QuestionApi } from "./api/question-api";
import { QuestionModel } from "./models/question-model";

export type QuestionComponentProps = {
  question: QuestionModel;
};

const QuestionComponent = (props: QuestionComponentProps) => {
  const router = useRouter();

  const questionApi = new QuestionApi();
  let isEnabled = true;

  const pushStat = async (answer: QuestionAnswer) => {
    if (!isEnabled) return;

    isEnabled = false;
    await questionApi.pushStat(props.question.id, { answer: answer });
    router.push(`/stats/${props.question.id}`);
  };

  return (
    <div>
      <div
        className="mt-10 rounded
                block text-center w-full md:w-full 
                mx-auto pt-12 pb-12 bg-white border 
                border-gray-200 shadow-zinc-800 shadow-lg"
      >
        <p className="font-normal text-center">{props.question.text}</p>
      </div>
      <div className="md:flex text-center mt-7">
        <button
          className="hover:shadow 
                    w-72 
                    bg-white
                    mx-auto 
                    md:w-1/2 
                    border 
                    border-gray-300 
                    hover:border-gray-100
                    hover:bg-gray-100
                    p-10 
                    rounded-md 
                    m-5"
          onClick={() => pushStat(QuestionAnswer.Normal)}
        >
          Normal
        </button>

        <button
          className="hover:shadow 
                    w-72 
                    bg-white
                    mx-auto 
                    md:w-1/2 
                    border 
                    border-gray-300 
                    hover:border-gray-100
                    hover:bg-gray-100
                    p-10 
                    rounded-md 
                    m-5"
          onClick={() => pushStat(QuestionAnswer.Nah)}
        >
          Nah
        </button>
      </div>
    </div>
  );
};

export default QuestionComponent;
