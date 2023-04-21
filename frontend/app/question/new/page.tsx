"use client"

import { QuestionApi } from "../api/question-api";

const AddPage = function () {
  
  const questionApi = new QuestionApi();


  const sumbmitQuestion = async () => {

  }


  return (
    <div>
      <div className="mt-6">
        <label htmlFor="large-input" 
          className="block ml-3 mb-2 text-sm font-medium text-gray-900 "
        > 
         Ask your question 
        </label>

        <textarea  id="large-input"
          className="block p-4 mx-auto text-gray-900 border border-gray-300 
          rounded-lg bg-gray-50 sm:text-md w-72 h-28
          focus:ring-blue-500 focus:border-blue-500 "
          />
        <button
          className="hover:shadow 
                    w-64 
                    bg-white
                    mx-auto 
                    flex
                    text-center
                    md:w-1/2 
                    border 
                    border-gray-300 
                    hover:border-gray-100
                    hover:bg-gray-100
                    p-5 
                    rounded-md 
                    m-5"
        >
          Submit
        </button>
      </div>
    </div>
  );
}
export default AddPage;
