import { Breadcrumbs } from '@mui/material'
import React, { useEffect, useRef, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import pub3 from "../assets/publication_modifie2.jpg";

export default function AboutUs() {
  const location = useLocation();
  const {subLinks, selectedLink} = location.state;
  const scrollToRef = useRef(null);
  useEffect(() => {
    if (scrollToRef.current) {
      scrollToRef.current.scrollIntoView()
    }
  }, [])
  return (
    <div className='mb-10 w-full mt-20 sm:mt-35 md:mt-30'>
    <div className="w-full sm:mt-20 relative h-3/6 lg:1/6 md:2/6 sm:3/6">
        <div className="text-base text-white sm:text-lg md:text-xl lg:text-5xl text-justify word-2 font-bold absolute bg-black left-50 right-50 top-70 bg-opacity-40 w-full h-full">
          <div
            className="w-full text-center sm:w-10/12 md:w-11/12 left-5 lg:left-20 absolute uppercase"
            style={{ top: "15%" }}
          >
            <div className="text-xs text-center sm:text-sm md:text-base lg:text-4xl font-semibold lg:mt-0.5">
              <Breadcrumbs
                sx={{ color: "white", textTransform: "none", fontSize: 16 }}
                className="mb-15"
              >
                <Link className="underline hover:text-blue-800" to={"/"}>
                  Page d'accueil
                </Link>
                <div></div>
              </Breadcrumbs>
            </div>
            <div className="mt-20 md:mt-40 text-2xl sm:text-3xl md:text-4xl lg:text-5xl">Qui sommes nous ?</div>
          </div>
        </div>
        <img src={pub3} className="h-full w-full" alt="Image Publication" />
      </div>
            <div
              ref={subLinks[0].label === selectedLink.label ? scrollToRef : null}
              className='p-4'
            >
              <h2 className='font-bold text-blue-800 text-xl'>{subLinks[0].label}</h2>
              <p className='text-justify leading-6'>
              L'association Afrik Impact Eco-SEn est une association constituée de jeunes de divers horizons. L’association est une initiative des jeunes étudiants de santé publique. 
En février 2023, lors d’un atelier de la fresque du climat, nous avons été frappés par l’impact du changement climatique sur la survie de l'espèce humaine à l'échelle planétaire. Face à ce constat et au regard de l'intérêt que suscite cette problématique à l'échelle mondiale, nous nous sommes questionnés sur le sort réservé à l’Afrique devant de telles catastrophes dans un contexte actuel. C’est ainsi que nous nous sommes proposés de vulgariser cet atelier scientifique, ludique et utile dans nos pays d’origine. (05-09 février 2024) et par la suite dans toute l’Afrique. 
Ne voulant pas circonscrire les champs d’action eu égard du contexte actuel de l’Afrique en termes de gestion environnementale, nous nous sommes proposés d’étaler nos actions sur 
              </p>
            </div>
            <div
              ref={subLinks[1].label === selectedLink.label ? scrollToRef : null}
              className='p-4'
            >
              <h2 className='font-bold text-blue-800 text-xl'>{subLinks[1].label}</h2>
              <p className='text-justify leading-6'>
              Nos missions se résultent en 5 mots: COSMAE
  Constatation, Sensibilisation, Mobilisation, Action et Évaluation

              </p>
            </div>
            <div
              ref={subLinks[2].label === selectedLink.label ? scrollToRef : null}
              className='p-4'
            >
              <h2 className='font-bold text-blue-800 text-xl'>{subLinks[2].label}</h2>
              <p className='text-justify leading-6'>
              <b>Transparence:</b> nous assurons une gestion transparente des activités de l'association, notamment en matière de financements et de prise de décisions.
               <br /><b>Sensibilisation:</b> nous croyons au rôle primordial des populations dans l’amélioration de leur environnement ; c’est pourquoi, nous promouvons l'éducation à l'environnement pour permettre à chacun de mieux comprendre les enjeux écologiques et de contribuer à leur résolution. Ceci passe par la sensibilisation du public aux enjeux environnementaux, afin de susciter l'engagement et la mobilisation de tous.
               <br /><b>Collaboration:</b> nous travaillons en partenariat avec d'autres acteurs de la société civile, les pouvoirs publics et les entreprises pour renforcer l'impact des actions de l'association.
               <br /><b>Inclusif:</b> nous sommes ouverts à la diversité, à l'égalité ainsi qu'à la représentation de chacun, indépendamment de ses caractéristiques ou de son identité. De même nous reconnaissons et valorisons la diversité des individus tout en s’assurant que tout le monde se sente accueilli, respecté et représenté.
               <br /><b>Innovation:</b> nous encourageons l'innovation et la recherche de solutions durables pour répondre aux défis environnementaux actuels et futurs.
              <br /> <b>Pluralisme:</b> nous militons pour le respect de la diversité des opinions et des parcours au sein de l'association, en favorisant le dialogue et la concertation pour aboutir à des prises de décisions collectives. Nous encourageons la participation et la prise d'initiatives de chacun.
              </p>
            </div>
            <div
              ref={subLinks[3].label === selectedLink.label ? scrollToRef : null}
              className='p-4'
            >
              <h2 className='font-bold text-blue-800 text-xl'>{subLinks[3].label}</h2>
              <p className='text-justify leading-6'>
              Notre combat est de favoriser un environnement sain et propice au bien être. Pour ce faire, nous:
            <div>-	Luttons contre la pollution de l’environnement intérieur et extérieur ;</div>
            <div>-	Promouvons les énergies renouvelables et les modes de vie plus durable;</div>
            <div>-	Encourageons la préservation des espaces naturels; </div>
            <div>-	Sensibilisons le public aux enjeux environnementaux et aux moyens de s’adapter au changement climatique.</div>
              </p>
            </div>
            <div
              ref={subLinks[4].label === selectedLink.label ? scrollToRef : null}
              className='p-4'
            >
              <h2 className='font-bold text-blue-800 text-xl'>{subLinks[4].label}</h2>
              <p className='text-justify leading-6'>
              La vision de l’association Afrik Impact Eco-SEn est de devenir un acteur incontournable dans la gestion de l’environnement, le développement durable et l'entrepreneuriat social en Afrique. Nous visons à promouvoir un développement économique inclusif, respectueux de l'environnement et bénéfique pour les communautés locales.
            <div>Nous aspirons à devenir un catalyseur de changement en soutenant et en accompagnant les entrepreneurs sociaux et les initiatives écologiques qui ont un impact positif sur la société et sur l'environnement. </div>
            <div>Enfin, nous espérons inspirer d'autres acteurs du développement à s'engager dans des actions similaires, afin de construire ensemble un avenir meilleur pour l'Afrique et ses habitants.</div>
              </p>
            </div>

    </div>  
  )
}
