"use client"
import { QuestionApi } from "@/app/question/api/question-api";

import Link from "next/link";
import { Chart } from "react-google-charts";

const StatsPage = async ({ params }) => {
  const questionApi = new QuestionApi();
  let questionStats = await questionApi.getStats(params.id);

  let nahPercentage = Math.round(
    (questionStats.nahAnswers / questionStats.totalAnswers) * 100
  );
  let normalPercentage = Math.round(
    (questionStats.normalAnswers / questionStats.totalAnswers) * 100
  );

  const data = [
    ["Title", "Amount"],
    ["Normal", questionStats.normalAnswers],
    ["Nah", questionStats.nahAnswers]
  ]

  const options = {
    title : "Normal vs Nah"
  }

  return (
    <div className="flex flex-col space-y-5">
      <Chart
        chartType="PieChart"
        data ={data}
        options={options}
        width={"100%"}
        height={"300px"}
      />
      
      <div className="">
        <table className="w-full text-sm text-left text-gray-500 ">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 ">
            <tr>
              <th scope="col" className="px-6 py-3">
                Name
              </th>
              <th scope="col" className="px-6 py-3">
                Percentage
              </th>
            </tr>
          </thead>
          <tbody>
            <tr className="bg-white border-b ">
              <td className="px-6 py-4">Normal</td>
              <td className="px-6 py-4">{normalPercentage}%</td>
            </tr>

            <tr className="bg-white border-b ">
              <td className="px-6 py-4">Nah</td>
              <td className="px-6 py-4">{nahPercentage}%</td>
            </tr>
          </tbody>
        </table>
      </div>
      <Link
        href="/"
        className="hover:shadow 
                    w-80 
                    bg-white
                    mx-auto 
                    md:w-1/2 
                    border 
                    border-gray-300 
                    hover:border-gray-100
                    hover:bg-gray-100
                    p-5 
                    rounded-md 
                    text-center
                    m-3"
      >
        Next
      </Link>

      <Link
        href="/question/new"
        className="hover:shadow 
                    w-80 
                    bg-white
                    mx-auto 
                    md:w-1/2 
                    border 
                    border-gray-300 
                    hover:border-gray-100
                    hover:bg-gray-100
                    p-5 
                    rounded-md 
                    text-center
                    m-3"
      >
        Submit a question
      </Link>
    </div>
  );
};

export default StatsPage;
