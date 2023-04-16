import { useRouter } from "next/navigation";
import { QuestionAnswer } from "./models/question-answer";
import { QuestionApi } from "./api/question-api";

type QuestionAnswerComponentProps = {
  questionId: number;
  answer: QuestionAnswer;
};

const QuestionAnswerComponent = (props: QuestionAnswerComponentProps) => {
  let isEnabled = true;
  const router = useRouter();
  const questionApi = new QuestionApi();

  const pushStat = async (answer: QuestionAnswer) => {
    if (!isEnabled) return;

    isEnabled = false;
    await questionApi.pushStat(props.questionId, answer);
    router.push(`/stats/${props.questionId}`);
  };

  return (
    <button
      className="hover:shadow 
                    w-80 
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
      onClick={() => pushStat(props.answer)}
    >
      {props.answer}
    </button>
  );
};
export default QuestionAnswerComponent;
