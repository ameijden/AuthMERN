import React, { useRef } from 'react'
import Modal from './Modal'

export default function Board(props) {
    const $modal = useRef()

    return (
        <div className="h-full w-full max-w-screen-lg inline-grid">
            <Modal closeOnBlur={true} ref={$modal}></Modal>
            <div className="w-full flex flex-wrap justify-center">
                {props.board.images.map((im, i) => (
                    <div key={i} className="lg:w-80 sm:w-64 w-80 lg:h-40 sm:h-32 h-40 p-2">
                        <div className={`overflow-hidden group relative inline-grid place-items-center w-full h-full bg-gray-100 rounded-md hover:shadow-lg transition-all duration-300`}>
                            <img className="h-full w-full object-cover z-10" src={im.resource || ''} alt=" " />
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}
