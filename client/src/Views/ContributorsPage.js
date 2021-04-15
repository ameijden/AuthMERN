import React, { useEffect, useState } from 'react'
import ContributorsService from './../Services/ContributorsService'
import sv from '../styles/variables'
import { useHistory } from 'react-router'

export default function ContributorsPage() {
    const [contributors, setContributors] = useState([])
    const history = useHistory();

    useEffect(() => {
        ContributorsService.fetchAllContributors().then(
            res => { setContributors(res.data) }
        ).catch(err => {
            if (err.response && err.response.status === 503) history.push('/503')
            return err;
        })
    }, [])//eslint-disable-line

    return (
        <div className="overflow-y-auto">
            <div className="flex flex-col items-center">
                <h1
                    className={`text-2xl sm:text-4xl mt-10 text-center text-${sv.primary} opacity-50`}>
                    Our Contributors
            </h1>
                <div className="container my-10 mx-20">
                    <div className="group grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 w-full p-5">
                        {contributors.map(contributor => (
                            <div className="col-span-1 text-center p-5 rounded-lg border transform duration-500 hover:border-green-700 hover:shadow-lg">
                                <div className="font-semibold text-xl">{contributor.name}</div>
                                <div className="text-sm opacity-50">{contributor.email}</div>
                                <div className="font-thin mt-3">{contributor.major}</div>
                                <div className="text-sm  text-gray-500">{contributor.yog}</div>
                                <div className="text-gray-500 mt-3">{contributor.hobby}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}
