import React from 'react'
import { Link } from 'react-router-dom'

export default function AboutPage() {
    return (
        <div className="text-center flex-grow justify-center items-center overflow-y-scroll">
            <div className="bg-gradient-to-r from-green-50 to-green-200 w-full flex flex-col p-10 gap-10 "

            >
                <div className="bg-gradient-to-r from-green-100 to-green-200 py-20 rounded-2xl shadow-2xl w-3/5 bg-gray-50 text-5xl font-thin text-green-700">
                    We Got You A Story!
                </div>
                <div className="bg-green-100 p-5 text-lg text-green-700 rounded-2xl shadow-2xl  w-3/5 self-end">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce id consequat
                    mauris, sit amet facilisis mauris. Donec dictum in mi sed fermentum. Donec
                    imperdiet ac arcu vel vulputate. Morbi nec ultricies nunc, et tempus orci.
                    Fusce condimentum nulla sit amet lorem posuere dignissim. Nullam orci tellus,
                    facilisis id posuere varius, ullamcorper non tellus. Etiam sollicitudin ornare lacus,
                    eu feugiat nulla fermentum vitae. Sed varius blandit augue, vel molestie ipsum
                    placerat et. Phasellus ac orci dui. Cras nisi turpis, sollicitudin ut auctor in,
                    rhoncus in urna. Donec sit amet molestie nisi, id suscipit leo.
                </div>
                <div className="bg-green-100 p-5 text-lg text-green-700 rounded-2xl shadow-2xl  w-3/5">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce id consequat
                    mauris, sit amet facilisis mauris. Donec dictum in mi sed fermentum. Donec
                    imperdiet ac arcu vel vulputate. Morbi nec ultricies nunc, et tempus orci.
                    Fusce condimentum nulla sit amet lorem posuere dignissim. Nullam orci tellus,
                    facilisis id posuere varius, ullamcorper non tellus. Etiam sollicitudin ornare lacus,
                    eu feugiat nulla fermentum vitae. Sed varius blandit augue, vel molestie ipsum
                    placerat et. Phasellus ac orci dui. Cras nisi turpis, sollicitudin ut auctor in,
                    rhoncus in urna. Donec sit amet molestie nisi, id suscipit leo.
                </div>
                <Link to="/contact" className="group relative flex justify-center items-center bg-green-100 p-5 text-2xl text-green-700 rounded-2xl shadow-2xl w-3/5 self-end overflow-hidden">
                    <span className="z-50">Get In Touch</span>
                    <div className="absolute transition-all duration-500 group-hover:w-full h-full bg-green-200 w-0">
                    </div>
                </Link>
            </div>
        </div>
    )
}
