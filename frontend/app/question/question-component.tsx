export default function QuestionComponent() {


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
                >
                    Nah
                </button>
            </div>
        </div>
    )
}
