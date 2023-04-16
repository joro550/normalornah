import { QuestionApi } from "./question/api/question-api";
import QuestionComponent from "./question/question-component";

const Home = async () => {
  const questionApi = new QuestionApi();

  let question = await questionApi.getQuestion();

  return (
    <main>
      <QuestionComponent question={question} />
    </main>
  );
};

export default Home;
