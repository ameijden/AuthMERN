import React, { useEffect, useState } from 'react'

const ConfirmDialog = (props) => {
    const [options, setOptions] = useState({
        message: "Confirm",
        title: "Are you sure?",
        cancel: {
            text: "Cancel",
            color: 'gray'
        },
        confirm: {
            text: "Confirm",
            color: 'blue'
        }
    })

    useEffect(() => {
        setOptions({ ...options, ...props.options })
    }, [props.options])//eslint-disable-line

    const cancel = () => {
        props.cancel()
    }
    const confirm = () => {
        props.confirm()
    }

    return (

        <div className="w-full flex flex-col max-w-md rounded-md bg-white p-5 gap-3">
            <div className="text-lg p-2 border-b">{options.title}</div>
            <div className="text-gray-700 p-2 border-b">{options.message}</div>
            <div className="flex gap-2 justify-end">
                <button onClick={cancel} className={`focus:outline-none rounded-md text-white px-4 py-1 text-${options.cancel.color}-500 hover:bg-${options.cancel.color}-50 opacity-100 hover:opacity-90`}>{options.cancel.text}</button>
                <button onClick={confirm} className={`focus:outline-none rounded-md text-white px-4 py-1 text-${options.confirm.color}-500 hover:bg-${options.confirm.color}-50 opacity-100 hover:opacity-90 font-semibold`}>{options.confirm.text}</button>
            </div>
        </div>
    )
}

export default ConfirmDialog