import React from 'react'
import ArrowForward from '@mui/icons-material/ArrowForward'
import { useNavigate } from 'react-router-dom'

export default function Agenda(props) {
  const navigate = useNavigate();
  const handleNavigate = () => {
      navigate("/tous-agendas");
  }
  return (
    <>
    <div className='cursor-pointer mb-7'>
    <div className="flex flex-row justify-between items-center w-11/12 m-auto border-b-2 p-4 border-blue-800  text-xl sm:text-2xl lg:text-4xl font-bold text-blue-800 mt-10">
    <h2>Agenda</h2>
    <div onClick={() => handleNavigate()} className='cursor-pointer'>
      Tous <ArrowForward className='hover:translate-x-1'/>
    </div>
    </div>
    <div className='mt-10'></div>
        <img width={"90%"} className='m-auto' src={props.src} alt="Agenda Image" />
        <div className='text-md px-8 text-blue-800 mt-5'>{props.title}</div>
        <div className='mb-10 text-blue-800 px-8 font-bold text-lg uppercase'>
            {props.text}
        </div>
    </div>
    </>
  )
}
