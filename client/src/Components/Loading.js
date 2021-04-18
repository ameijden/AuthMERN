import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'

export default function Loading() {
    return (
        <div className="w-full h-full flex justify-center text-gray-400 items-center">
            <FontAwesomeIcon icon="spinner" spin size="4x" />
        </div>
    )
}
