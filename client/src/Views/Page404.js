import React from 'react'
import { Link } from 'react-router-dom'
import sv from '../styles/variables'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFrown } from "@fortawesome/free-solid-svg-icons";

export default function Page404() {
    return (
        <div className="flex flex-col text-center px-1 flex-grow justify-center items-center">
            <div className={`text-${'gray-500'}`}>
                <FontAwesomeIcon icon={faFrown} size='9x' />
            </div>
            <div className={`mt-6 text-6xl font-semibold text-${'gray-500'}`}>404</div>
            <div className={`mt-5 text-2xl text-gray-400`}>Page Not Found</div>
            <div className="mt-3 text-lg text-gray-500">The page you are looking for does not exist</div>
            <div className="mt-6">
                <Link to="/" className={`px-12 bg-${sv.primary} text-white font-semibold py-2 rounded-md hover:opacity-90`}>Back To Home</Link>
            </div>
        </div>
    )
}
