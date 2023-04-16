import { QuestionApi } from "@/app/question/api/question-api";
import Link from "next/link";

export default async function StatsPage({ id }: { id: number }) {
  const questionApi = new QuestionApi();
  let questionStats = await questionApi.getStats(id);

  let nahPercentage =
    (questionStats.nahAnswers / questionStats.totalAnswers) * 100;
  let normalPercentage =
    (questionStats.normalAnswers / questionStats.totalAnswers) * 100;

  const myStyle = {
    width: "200px",
    height: "200px",
    backgroundImage: `conic-gradient(orange ${nahPercentage}%, red ${normalPercentage}%)`,
    border_radius: `50%`,
  };

  return (
    <div className="mx-auto space-y-10">
      <div className="mx-auto rounded-full mt-10" style={myStyle}></div>

      <div className="overflow-x-auto">
        <table className="w-full text-sm text-left text-gray-500 ">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 ">
            <tr>
              <th scope="col" className="px-6 py-3">
                Colour
              </th>
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
              <td className="px-6 py-4">
                <div
                  style={{ backgroundColor: "red" }}
                  className="h-5 w-5"
                ></div>
              </td>
              <td className="px-6 py-4">Normal</td>
              <td className="px-6 py-4">{normalPercentage}%</td>
            </tr>

            <tr className="bg-white border-b ">
              <th
                scope="row"
                className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap "
              >
                <div
                  style={{ backgroundColor: "orange" }}
                  className="h-5 w-5"
                ></div>
              </th>
              <td className="px-6 py-4">Nah</td>
              <td className="px-6 py-4">{nahPercentage}%</td>
            </tr>
          </tbody>
        </table>
      </div>

      <Link
        className="hover:shadow 
                    w-80 
                    bg-white
                    mx-auto 
                    border 
                    border-gray-300 
                    hover:border-gray-100
                    hover:bg-gray-100
                    p-10 
                    rounded-md 
                    m-5"
        href="/"
      >
        Next
      </Link>

      <Link
        className="hover:shadow 
                    w-80 
                    bg-white
                    mx-auto 
                    border 
                    border-gray-300 
                    hover:border-gray-100
                    hover:bg-gray-100
                    p-10 
                    rounded-md 
                    m-5"
        href=""
      >
        Submit a question
      </Link>
    </div>
  );
}
