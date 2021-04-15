import React from 'react'

export default function Welcome() {
    return (
        <div className="h-full w-full flex flex-col justify-center items-center bg-gradient-to-br from-green-100 to-green-300">
            <div className="md:px-0 px-5">
                <div className={`w-full text-center md:text-6xl text-3xl text-gray-800 md:font-light`}>Medical Mnemonics</div>
                <div className={`w-full text-right md:text-2xl text-lg text-gray-800`}>1.0.0</div>
                <div className={`w-full text-center md:text-2xl text-xl text-gray-800 mt-12`}>All your mnemonics in one place.</div>
                <div className={`w-full text-center text-gray-800 mt-12`}>Techinical jargon made easy to memorize</div>
                <div className={`w-full text-center text-gray-800`}>Structures, Organized and Searchable</div>
                <div className={`w-full text-center text-gray-800 font-semibold`}>Make your own Contributions!</div>

            </div>
            <div className="justify-self-end mt-36">
                <button onClick={() => { document.getElementById('main').scrollIntoView(); }} className="group animate-pulse focus:outline-none flex flex-col items-center w-40">
                    <div className="text-lg font-semibold">Get Started!</div>
                    <div className="pt-0.5 mt-1 bg-gray-800 w-0 group-hover:w-20 transform tansition-all duration-500"></div>
                    <div className="pt-0.5 mt-1 bg-gray-800 w-0 group-hover:w-16 transform tansition-all duration-500"></div>
                    <div className="pt-0.5 mt-1 bg-gray-800 w-0 group-hover:w-12 transform tansition-all duration-500"></div>
                    <div className="pt-0.5 mt-1 bg-gray-800 w-0 group-hover:w-8 transform tansition-all duration-500"></div>
                </button>
            </div>
        </div>
    )
}
