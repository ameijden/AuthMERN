import React from 'react'
import { Link } from 'react-router-dom'
import sv from '../styles/variables'

export default function ContributionResponse() {
    return (
        <div className="flex flex-col text-center px-1 flex-grow justify-center items-center">
            <div className={`text-9xl font-bold text-${'green-600'}`}>✓</div>
            <div className={`text-3xl text-${'green-600'}`}>Thank you for contributing to the website!</div>
            <div className="text-2xl">We have recieved your submission and will review it shortly</div>
            <div className="mt-6">
                <Link to="/" className={`px-12 bg-${sv.primary} text-white font-semibold py-2 rounded-md hover:opacity-90`}>Back To Home</Link>
            </div>
        </div>
    )
}
