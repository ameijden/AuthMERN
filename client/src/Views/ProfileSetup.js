import React from 'react'
import UserDetailsForm from '../Components/UserDetailsForm'

export default function ProfileSetup() {
    return (
        <div className="flex w-full h-full justify-center items-center">
            <div className="shadow rounded-md">
                <UserDetailsForm></UserDetailsForm>
            </div>
        </div>
    )
}
