import React from 'react'

export default function PublicationCard(props) {
  return (
    <div onClick={props.onClick} className='w-full cursor-pointer relative h-4/6 lg:1/6 md:2/6 sm:3/6'>
    <div className='text-base sm:text-lg md:text-xl lg:text-3xl text-justify word-2 font-bold absolute bg-black left-50 right-50 text-white p-24 top-70 bg-opacity-40 w-full h-full'>
    <div className='w-10/12 sm:w-9/12 md:w-8/12 left-5 lg:left-20 absolute uppercase' style={{top: "30%"}}>
      <div className='text-xs sm:text-sm md:text-base lg:text-lg font-semibold mb-3'>Publications</div>
      {props.text} 
    </div>
    </div>
    <img src={props.src} className='h-full' alt="Image Publication"/>
  </div>
  )
}
