"use client";

import { useRouter } from "next/navigation";
import { QuestionAnswer } from "./models/question-answer";

const QuestionComponent = () => {
    const router = useRouter();
    const isEnabled = true;

    const pushStat = (answer : QuestionAnswer) => {
        router.push('/stats')
    }


    return (
        <div>
            <div className="mt-10 rounded
                block text-center w-80 md:w-full 
                mx-auto pt-20 pb-20 bg-white border 
                border-gray-200 shadow"
            >
                <p className="font-normal text-center">Eating pasta from the pan</p>
            </div>
            <div className="md:flex text-center mt-10">
                <button className='hover:shadow 
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
                    m-5'

                    onClick={() => pushStat(QuestionAnswer.Normal)}
                >
                    Normal
                </button>

                <button className='hover:shadow 
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
                    m-5'

                    onClick={() => pushStat(QuestionAnswer.Nah)}
                >
                    Nah
                </button>
            </div>
        </div>

    );
}

export default QuestionComponent;
