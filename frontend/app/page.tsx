

export default function Home() {
  return (
    <main className="flex min-w-screen min-h-screen flex-col items-center justify-between">
        <div className="rounded block min-w-screen p-6 bg-white border border-gray-200 shadow hover:bg-gray-100 dark:border-gray-700 dark:hover:bg-gray-700">
            <p className="font-normal text-gray-700 dark:text-gray-400">Eating pasta from the pan</p>
        </div>
        <button className='border border-white p-5 rounded-md'>Normal</button>
        <button className='border border-white p-5 rounded-md'>Nah</button>
    </main>
  )
}
