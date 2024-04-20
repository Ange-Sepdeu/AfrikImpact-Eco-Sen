import React from 'react'
import PublicationSlider from '../components/PublicationSlider';
import Actualites from '../components/Actualites';
import VideoPodcast from '../components/VideoPodcast';
import Agenda from '../components/Agenda';
import pub2 from "../assets/publication_2.jpg";
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { getViewableAgendas, selectAgendas } from '../redux/app/index.slice';
import axiosInstance from '../axiosInstance/axiosInstance';

export default function Home() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getViewableAgendas())
  })
  const agendas = useSelector(selectAgendas);
  return (
    <>
     <PublicationSlider />
     <Actualites />
     <div className="flex w-full flex-row flex-wrap justify-between items-start">
    <div className='w-full sm:w-full lg:w-8/12'>
     <VideoPodcast />
     </div>
     <div className='w-full sm:w-full lg:w-4/12'>
     {/* <Agenda src={pub2} width={"35%"} title={"Agenda title"} text={"Lorem ipsum dolor sit amet consectetur adipisicing elit. Inventore, ad. Esse recusandae laboriosam deleniti. Similique, ex corrupti eligendi"} /> */}
     <Agenda src={axiosInstance.getUri() + "/static/"+ agendas[0]?.image_url} width={"35%"} title={agendas[0]?.agenda_title} text={agendas[0]?.agenda_text} />
     </div>
     </div>
    </>
  )
}
