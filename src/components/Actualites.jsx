import React, { useState } from 'react'
import Card from './Card'
import act2 from "../assets/publication_5.jpg";
import act3  from "../assets/publication_6.jpg";
import act1 from "../assets/publication_4.jpg";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from 'react-slick';
import pub2 from "../assets/publication_2.jpg";
import pub3 from "../assets/publication_3.jpg";
import act4 from "../assets/publication_modifie1.jpg";
import { Link, useNavigate } from 'react-router-dom';
import {useDispatch, useSelector} from "react-redux"
import { getActualites, getAllActualites, getAllAvailableActualites, setSelectedActualites } from '../redux/app/actualite.slice';
import { useEffect } from 'react';
import { getViewableActualites, selectActualites } from '../redux/app/index.slice';
import axiosInstance from '../axiosInstance/axiosInstance';

export default function Actualites() {
    const data = [1,2,3,4]
    const settings = {
        dots: true,
        speed: 500,
        lazyLoad: true,
        slidesToShow: 4,
        slidesToScroll: 2,
        infinite: true,
        autoplay: true,
        autoplaySpeed: 3000,
        responsive: [
          {
            breakpoint: 1024,
            settings: {
              arrows: false,
              slidesToShow: 3,
            },
          },
            {
              breakpoint: 768,
              settings: {
                arrows: false,
                slidesToShow: 2,
              },
            },
            {
              breakpoint: 480,
              settings: {
                arrows: false,
                slidesToShow: 1,
              },
            },
          ],
      };
      const navigate = useNavigate()
      const dispatch = useDispatch()
      const handleSetSelectedActualite = (values) => {
          console.log(values)
          dispatch(setSelectedActualites(values))
      }
      useEffect(() => {
        dispatch(getViewableActualites())
      })
      const actualites = useSelector(selectActualites);
      const handleNavigate = (actualite) => {
          navigate("/details-actualite", {state:actualite});
      }
  return (
    <>
    <h2 className='mt-10 text-center w-full border-b-2 p-4 border-blue-800 text-2xl sm:text-3xl lg:text-4xl font-bold text-blue-800 uppercase'>Actualités</h2>
    <div className='mt-10'></div>
    <div className="mt-10 slide-container overflow-x-hidden overflow-y-hidden">
     <Slider {...settings}>
        {
          [...actualites].map((actualite, index) => {
            const src = axiosInstance.getUri()+"/static/"+actualite.image_url;
            return (
              <Card key={index} onClick={() => handleNavigate(actualite)} width={"90%"} src={src} title={actualite.actualite_title} />
            )
          })
        }
      <Link onClick={() => handleSetSelectedActualite({ imageUrl: "Image Ul",title: "Communi",paragraph: ""})} 
       to={"details-actualite"} className='w-full relative h-1/6'>
          <Card width={"90%"} src={act2} title={"22 mars 2024 | Communiqué de presse"} text={"Lorem ipsum dolor sit amet consectetur, adipisicing elit. Voluptatem tempore explicabo debitis reiciendis corporis facere nobis sequi rem"} />
      </Link>
      <div className='w-full relative h-1/6'>
          <Card width={"90%"} src={act3} title={"22 mars 2024 | Communiqué de presse"} text={"Lorem ipsum dolor sit amet consectetur, adipisicing elit. Voluptatem tempore explicabo debitis reiciendis corporis facere nobis sequi rem"} />
      </div>
      <div className='w-full relative h-1/6'>
          <Card width={"90%"} src={act1} title={"22 mars 2024 | Communiqué de presse"} text={"Lorem ipsum dolor sit amet consectetur, adipisicing elit. Voluptatem tempore explicabo debitis reiciendis corporis facere nobis sequi rem"} />
      </div>
      <div className='w-full relative h-1/6'>
          <Card width={"90%"} src={pub3} title={"22 mars 2024 | Communiqué de presse"} text={"Lorem ipsum dolor sit amet consectetur, adipisicing elit. Voluptatem tempore explicabo debitis reiciendis corporis facere nobis sequi rem"} />
      </div>
      <div className='w-full relative h-1/6'>
          <Card width={"90%"} src={pub2} title={"22 mars 2024 | Communiqué de presse"} text={"Lorem ipsum dolor sit amet consectetur, adipisicing elit. Voluptatem tempore explicabo debitis reiciendis corporis facere nobis sequi rem"} />
      </div>
      <div className='w-full relative h-1/6'>
          <Card width={"90%"} src={act3} title={"22 mars 2024 | Communiqué de presse"} text={"Lorem ipsum dolor sit amet consectetur, adipisicing elit. Voluptatem tempore explicabo debitis reiciendis corporis facere nobis sequi rem"} />
      </div>
      <div className='w-full relative h-1/6'>
          <Card width={"90%"} src={act1} title={"22 mars 2024 | Communiqué de presse"} text={"Lorem ipsum dolor sit amet consectetur, adipisicing elit. Voluptatem tempore explicabo debitis reiciendis corporis facere nobis sequi rem"} />
      </div>
      <div className='w-full relative h-1/6'>
          <Card width={"90%"} src={act4} title={"22 mars 2024 | Communiqué de presse"} text={"Lorem ipsum dolor sit amet consectetur, adipisicing elit. Voluptatem tempore explicabo debitis reiciendis corporis facere nobis sequi rem"} />
      </div>
    </Slider>
    </div>
    </>
    
  )
}
