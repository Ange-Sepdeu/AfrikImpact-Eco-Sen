import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getViewableAgendas, selectAgendas } from '../redux/app/index.slice';
import axiosInstance from '../axiosInstance/axiosInstance';
import Agenda from '../components/Agenda';

export default function AgendaComplet() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getViewableAgendas());
  })
  const agendas = useSelector(selectAgendas);
  return (
    <div className='mt-28'>
      <h2 className='text-blue-800 text-3xl px-8 py-4 font-bold'>Tous les agendas</h2>
      <div className='flex flex-row p-4 justify-between items-center flex-wrap'>
      {
        [...agendas].map((agenda, index) => {
          const image_url = axiosInstance.getUri()+"/static/"+agenda.image_url;
          return (
            <div className='w-full sm:w-full md:w-6/12 lg:w-4/12'>
                  <img width={"90%"} className='m-auto' src={image_url} alt="Agenda Image" />
                  <div className='text-md px-8 text-blue-800 mt-5'>{agenda.agenda_title}</div>
                  <div className='mb-10 text-blue-800 px-8 font-bold text-lg uppercase'>
                  {agenda.agenda_text}
                  </div>
            </div>
          )
        })
      }
      </div>
    </div>
  )
}
