import React from 'react'

export default function Card(props) {
  return (
    <div onClick={props.onClick} style={{width: props.width}} className='hover:border m-auto h-4/6 hover:border-blue-900 cursor-pointer hover:bg-opacity-10 hover:bg-blue-900'>
        <img src={props.src} alt="Card Image" />
        <div className='text-md px-8 text-blue-800 mt-5'>{props.title}</div>
        <div className='mb-10 text-blue-800 px-8 font-bold text-xl uppercase'>
            {props.text}
        </div>
    </div>
  )
}
