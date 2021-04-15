import React, { useState } from 'react'
import sv from '../styles/variables'
import MiscService from "../Services/MiscService";

export default function ContactPage() {

    const [formData, setFormData] = useState({
        type: "Contact",
        name: "",
        email: "",
        message: "",
    });

    const [submitState, setSubmitState] = useState({
        loading: 0,
        response: "",
    });

    const handleChange = (e) => {
        let name = e.target.name;
        let value = e.target.value;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const onSubmit = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setSubmitState({
            loading: 1,
            response: "Sending..."
        })
        MiscService.sendEmail(formData).then(() => {
            setSubmitState({
                loading: 2,
                response: "Delivered!"
            })
        }).catch(err => {
            console.log(err)
            setSubmitState({
                loading: -1,
                response: "Failed to process your request"
            })
        })


    }


    return (
        <div className="flex-grow overflow-y-auto">
            <div className="flex w-full h-full p-5 bg-gradient-to-l from-green-50 to-green-200">
                <form onSubmit={onSubmit} className="md:w-1/2 w-full p-5">
                    <div className="p-5 gap-4 flex flex-col rounded-xl bg-white shadow-lg w-full h-full">
                        <div className="text-center">
                            <div className="text-4xl font-thin text-green-600">Get In Touch</div>
                            <div className="text-gray-400 text-sm mt-2">{'Or feel free to email me at '}
                                <a
                                    className="hover:text-green-400 underline"
                                    href={`mailto:mohammad.fidaali@gmail.com?subject=Medical%20Mnemonics%3A%20Get%20In%20Touch&body=Hi`}>
                                    <span>{'mohammad.fidaali@gmail.com'}</span>
                                </a>
                            </div>
                        </div>
                        <div>
                            <label
                                htmlFor='name'
                                className='block text-sm font-medium text-gray-700'>
                                Name
                            </label>
                            <input
                                required="true"
                                type='text'
                                name='name'
                                id='name'
                                value={formData.name}
                                onChange={(e) => handleChange(e)}
                                className={`mt-1 focus:outline-none focus:ring-${sv.primary} focus:border-${sv.primary} block w-full shadow-sm sm:text-sm border-gray-300 rounded-md`}></input>
                        </div>
                        <div>
                            <label
                                htmlFor='email'
                                className='block text-sm font-medium text-gray-700'>
                                Email
                            </label>
                            <input
                                required="true"
                                type='email'
                                name='email'
                                id='email'
                                value={formData.email}
                                onChange={(e) => handleChange(e)}
                                className={`mt-1 focus:outline-none focus:ring-${sv.primary} focus:border-${sv.primary} block w-full shadow-sm sm:text-sm border-gray-300 rounded-md`}></input>
                        </div>
                        <div className="flex-grow flex flex-col">
                            <label
                                htmlFor='message'
                                className='block text-sm font-medium text-gray-700'>
                                Message
                            </label>
                            <textarea
                                required="true"
                                type='text'
                                name='message'
                                id='message'
                                value={formData.message}
                                onChange={(e) => handleChange(e)}
                                className={`h-full resize-none mt-1 focus:outline-none focus:ring-${sv.primary} focus:border-${sv.primary} block w-full shadow-sm sm:text-sm border-gray-300 rounded-md`}></textarea>
                        </div>
                        <div className="w-full flex flex-col items-center gap-2">
                            <div
                                className={`font-semibold ${submitState.loading === -1 ? "text-red-600" : "text-green-400"
                                    }`}>
                                {submitState.response}
                            </div>
                            <button
                                type='submit'
                                className={`
                                    flex items-center justify-center py-2 px-4 border border-transparent shadow-sm text-sm
                                    font-medium rounded-md text-white bg-${sv.primary} hover:opacity-90 focus:outline-none focus:ring-2
                                    `}>
                                <span>Say Hi!</span>
                                {submitState.loading === 1 && (
                                    <div className='ml-3'>
                                        <div className='w-4 h-4 rounded-full border-t-2 border-grey-500 animate-spin'></div>
                                    </div>
                                )}
                            </button>
                        </div>
                    </div>
                </form>
                <div className="hidden md:w-1/2 w-0 md:flex flex-col justify-center items-center">
                    <div className="flex items-center justify-center text-2xl text-green-600 mr-40 hover:mr-44 transition-all duration-200 rounded-t-full rounded-l-full bg-white shadow-lg h-32 w-32">
                        We
                    </div>
                    <div className="flex items-center justify-center text-xl text-green-600 -mt-10 ml-28 hover:ml-36 transition-all duration-200 rounded-t-full rounded-r-full bg-white shadow-lg h-24 w-24">
                        Love
                    </div>
                    <div className="flex items-center justify-center text-xl text-green-600 mr-40 hover:-mt-8 hover:mb-8 transition-all duration-200 rounded-b-full rounded-l-full bg-white shadow-lg h-28 w-28">
                        Hearing
                    </div>
                    <div className="flex items-center justify-center text-xl text-green-600 -mt-20 ml-40 hover:ml-24 transition-all duration-200 rounded-b-full rounded-r-full bg-white shadow-lg h-20 w-20">
                        From
                    </div>
                    <div className="flex items-center justify-center text-3xl text-green-600 mt-5 ml-32 hover:ml-24 transition-all duration-200 font-semibold rounded-b-full rounded-r-full bg-white shadow-lg h-36 w-36">
                        You!
                    </div>
                </div>
            </div>
        </div>
    )
}
