import { Breadcrumbs } from '@mui/material'
import React, { useEffect, useRef} from 'react'
import { Link, useLocation } from 'react-router-dom'
import pub3 from "../assets/publication_modifie3.jpg";

export default function OurActions() {
  const location = useLocation();
  const {subLinks, selectedLink} = location.state;
  const scrollToRef = useRef(null);
  useEffect(() => {
    if (scrollToRef.current) {
      scrollToRef.current.scrollIntoView()
    }
  }, [])
  return (
    <div className='mb-10 mt-20'>
    <div className="w-full relative h-3/6 lg:1/6 md:2/6 sm:3/6">
        <div className="text-base text-white sm:text-lg md:text-xl lg:text-5xl text-justify word-2 font-bold absolute bg-black left-50 right-50 p-24 top-70 bg-opacity-40 w-full h-full">
          <div
            className="w-10/12 text-center sm:w-9/12 md:w-10/12 left-5 lg:left-20 absolute uppercase"
            style={{ top: "15%" }}
          >
            <div className="text-xs text-center sm:text-sm md:text-base lg:text-lg font-semibold mb-3">
              <Breadcrumbs
                sx={{ color: "white", textTransform: "none", fontSize: 16 }}
                className="mb-15"
              >
                <Link className="underline text-xs hover:text-blue-800" to={"/"}>
                  Page d'accueil
                </Link>
                <div></div>
              </Breadcrumbs>
            </div>
            <div className="mt-20 md:mt-40 text-2xl sm:text-3xl md:text-4xl lg:text-5xl">Nos actions</div>
          </div>
        </div>
        <img src={pub3} className="h-full" alt="Image Publication" />
      </div>
      <div className='leading-6 mt-5 px-4'>
      Afrik Impact Eco-SEN est une organisation qui mène diverses actions en faveur de l'environnement et du développement durable en Afrique. 
Nos s’articulent autour de: 
      </div>
            <div
              ref={subLinks[0].label === selectedLink.label ? scrollToRef : null}
              className='p-4'
            >
              <h2 className='font-bold text-blue-800 text-xl'>{subLinks[0].label}</h2>
              <p className='text-justify leading-6'>
              Nous encourageons l'utilisation des énergies renouvelables comme les panneaux solaires et biogaz pour réduire la dépendance aux énergies fossiles et limiter les émissions de gaz à effet de serre;
              </p>
            </div>
            <div
              ref={subLinks[1].label === selectedLink.label ? scrollToRef : null}
              className='p-4'
            >
              <h2 className='font-bold text-blue-800 text-xl'>{subLinks[1].label}</h2>
              <p className='text-justify leading-6'>
              Nous mettons en place des projets de reboisement pour restaurer les écosystèmes forestiers et lutter contre la déforestation;
              </p>
            </div>
            <div
              ref={subLinks[2].label === selectedLink.label ? scrollToRef : null}
              className='p-4'
            >
              <h2 className='font-bold text-blue-800 text-xl'>{subLinks[2].label}</h2>
              <p className='text-justify leading-6'>
                Nous encourageons l'utilisation des énergies renouvelables comme les panneaux solaires et biogaz pour réduire la dépendance aux énergies fossiles et limiter les émissions de gaz à effet de serre;
              </p>
            </div>
            <div
              ref={subLinks[3].label === selectedLink.label ? scrollToRef : null}
              className='p-4'
            >
              <h2 className='font-bold text-blue-800 text-xl'>{subLinks[3].label}</h2>
              <p className='text-justify leading-6'>
              Nous travaillons avec les communautés locales pour mettre en place des solutions durables en matière d'agriculture, d'assainissement ou encore de gestion des déchets.
              </p>
            </div>
            <div
              ref={subLinks[4].label === selectedLink.label ? scrollToRef : null}
              className='p-4'
            >
              <h2 className='font-bold text-blue-800 text-xl'>{subLinks[4].label}</h2>
              <p className='text-justify leading-6'>
              Nous menons des actions de plaidoyer auprès des autorités locales et nationales pour promouvoir des politiques environnementales et des mesures en faveur du développement durable.
              </p>
            </div>
    </div>
  )
}
