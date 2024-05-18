import React, { useEffect } from 'react'
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import pub2 from "../assets/publication_2.jpg";
import pub3 from "../assets/publication_3.jpg";
import pub1 from "../assets/publication_5.jpg";
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
    </Slider>
    </div>
  )
}
