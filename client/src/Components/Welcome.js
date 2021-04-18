import React from "react";

export default function Welcome() {
  return (
    <div className='h-full w-full flex flex-col justify-center items-center bg-gradient-to-br from-green-100 to-green-300'>
      <div className='md:px-0 px-5'>
        <div
          className={`w-full text-center md:text-6xl text-3xl text-gray-800 md:font-light`}>
          Home Screen
        </div>
      </div>
    </div>
  );
}
