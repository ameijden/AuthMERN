import React, { useEffect } from 'react'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHardHat, faTools } from "@fortawesome/free-solid-svg-icons";
import RecordsService from '../Services/RecordsService';
import { useHistory } from 'react-router-dom';

export default function Page503() {
    const history = useHistory();
    useEffect(() => {
        RecordsService.test().then(() => { history.push('/') })
            .catch(() => { return })
    }, [])//eslint-disable-line

    return (
        <div className="flex flex-col text-center px-1 flex-grow justify-center items-center">
            <div className={`flex flex-col items-center`}>
                <FontAwesomeIcon className="-mb-12 text-yellow-400" icon={faHardHat} size='9x' />
                <FontAwesomeIcon className="text-gray-600" icon={faTools} size='5x' />

            </div>
            <div className={`mt-5 font-semibold text-4xl text-gray-600`}>We'll be right back!</div>
            <div className="text-2xl text-gray-600">Website is temporarily down for maintenance. Please check back soon!</div>
        </div>
    )
}
