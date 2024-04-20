import React, { useEffect } from 'react'
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import pub2 from "../assets/publication_2.jpg";
import pub3 from "../assets/publication_3.jpg";
import pub1 from "../assets/publication_modifie2.jpg";
import act1 from "../assets/publication_4.jpg";
import pub4 from "../assets/pub7.jpg"
import pub5 from "../assets/pub8.jpg"
import pub6 from "../assets/publication_modifie4.jpg"
import pub7 from "../assets/pub10.jpg"
import PublicationCard from './PublicationCard';
import { useDispatch, useSelector } from 'react-redux';
import { getViewablePublications, selectPublications } from '../redux/app/index.slice';
import axiosInstance from '../axiosInstance/axiosInstance';
import {useNavigate} from "react-router-dom";

export default function PublicationSlider() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getViewablePublications());
  })
  const publications = useSelector(selectPublications);
    const settings = {
        dots: true,
        speed: 1000,
        lazyload: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        infinite: true,
        autoplay: true,
        autoplaySpeed: 3000,
      };
      const navigation = useNavigate();
      const handleNavigation = (values) => {
        navigation("/details-publication", {state: values})
      }
      let publicP = {
        image_url: pub1,
        publication_title:"discours d’ouverture du séminaire sur les enjeux climatiques au Cameroun par le ministre de l’emploi et de la formation professionnelle.",
        publication_text: "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Assumenda necessitatibus illo dicta numquam, provident non, qui obcaecati error sed ea doloremque? Aliquid saepe ratione iure magnam quisquam aut suscipit voluptatem!"
      }
  return (
    <div className="mt-20 slide-container overflow-x-hidden overflow-y-hidden">
     <Slider {...settings}>
      <PublicationCard onClick={() => handleNavigation(publicP)} src={pub1} text={"discours d’ouverture du séminaire sur les enjeux climatiques au Cameroun par le ministre de l’emploi et de la formation professionnelle."} />
      {
        [...publications].map((publication, index) => {
            const src = axiosInstance.getUri()+"/static/"+publication.image_url;
            return (
              <PublicationCard key={index} onClick={() => handleNavigation(publication)} src={src} text={publication.publication_title} />
            ) 
        })
      }
      {/* <div className='w-full relative h-4/6 lg:1/6 md:2/6 sm:3/6'>
      <div className='text-base sm:text-lg md:text-xl lg:text-3xl text-justify word-2 font-bold absolute bg-black left-50 right-50 text-white p-24 top-70 bg-opacity-40 w-full h-full'>
        <div className='w-10/12 sm:w-9/12 md:w-8/12 absolute uppercase left-5 lg:left-20' style={{top: "30%"}}>
          <div className='text-xs sm:text-sm md:text-base lg:text-lg font-semibold mb-3'>Publications</div>
          L’institut supérieur Pierre & Marie Mbondji nous a ouvert les portes 
          pour l’atelier de formation 
          des futurs animateurs de la fresque du climat 
        </div>
        </div>
        <img src={pub2} className='h-full' alt="Image Publication 1"/>
      </div>
      <div className='w-full relative h-4/6 lg:1/6 md:2/6 sm:3/6'>
      <div className='text-base sm:text-lg md:text-xl lg:text-3xl text-justify word-2 font-bold absolute bg-black left-50 right-50 text-white p-24 top-70 bg-opacity-40 w-full h-full'>
        <div className='w-10/12 sm:w-9/12 md:w-8/12 absolute uppercase left-5 lg:left-20' style={{top: "30%"}}>
          <div className='text-xs sm:text-sm md:text-base lg:text-lg font-semibold mb-3'>Publications</div>
          Photo de famille des participants à l’atelier de la fresque du climat à Yaoundé
          </div>
        </div>
        <img src={act1} className='h-full' alt="Image Publication 1"/>
      </div>
      <div className='w-full relative h-4/6 lg:1/6 md:2/6 sm:3/6'>
      <div className='text-base sm:text-lg md:text-xl lg:text-3xl text-justify word-2 font-bold absolute bg-black left-50 right-50 text-white p-24 top-70 bg-opacity-40 w-full h-full'>
        <div className='w-10/12 sm:w-9/12 md:w-8/12 absolute uppercase left-5 lg:left-20' style={{top: "30%"}}>
          <div className='text-xs sm:text-sm md:text-base lg:text-lg font-semibold mb-3'>Publications</div>
          Présentation de la thématique sur le 
          réchauffement climatique et maladies émergentes par le Pr Peter Mbondji.
        </div>
        </div>
        <img src={pub4} className='h-full w-full' alt="Image Publication 1"/>
      </div>
      <div className='w-full relative h-4/6 lg:1/6 md:2/6 sm:3/6'>
      <div className='text-base sm:text-lg md:text-xl lg:text-3xl text-justify word-2 font-bold absolute bg-black left-50 right-50 text-white p-24 top-70 bg-opacity-40 w-full h-full'>
        <div className='w-10/12 sm:w-9/12 md:w-8/12 absolute uppercase left-5 lg:left-20' style={{top: "30%"}}>
          <div className='text-xs sm:text-sm md:text-base lg:text-lg font-semibold mb-3'>Publications</div>
          un animateur en pleine action. A l'aide de jeux de question 
          réponse il stimule l'intelligence des participants 
          et leur donne la possible de trouver eux même la réponse.
        </div>
        </div>
        <img src={pub6} className='object-fill w-full' alt="Image Publication 1"/>
      </div>
      <div className='w-full relative h-4/6 lg:1/6 md:2/6 sm:3/6'>
      <div className='text-base sm:text-lg md:text-xl lg:text-3xl text-justify word-2 font-bold absolute bg-black left-50 right-50 text-white p-24 top-70 bg-opacity-40 w-full h-full'>
        <div className='w-10/12 sm:w-9/12 md:w-8/12 absolute uppercase left-5 lg:left-20' style={{top: "30%"}}>
          <div className='text-xs sm:text-sm md:text-base lg:text-lg font-semibold mb-3'>Publications</div>
          une table d’animation de la fresque du Climat.  
          Un atelier de la fresque se déroule avec un minimum 
          de cinq participants et un maximum de huit participants. 
        </div>
        </div>
        <img src={pub7} className='h-full w-full' alt="Image Publication 1"/>
      </div>       */}
    </Slider>
    </div>
  )
}
