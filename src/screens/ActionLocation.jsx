import { Breadcrumbs } from '@mui/material'
import React, { useEffect, useRef, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import pub3 from "../assets/publication_modifie1.jpg";


export default function ActionLocation() {
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
            style={{ top: "30%" }}
          >
            <div className="text-xs text-center sm:text-sm md:text-base lg:text-lg font-semibold mb-3">
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
            <div className="mt-20">Ou agissons nous ?</div>
          </div>
        </div>
        <img src={pub3} className="h-full" alt="Image Publication" />
      </div>
     {
        [...subLinks].map((link, index) => {
          return (
            <div
              key={index}
              ref={link.label === selectedLink.label ? scrollToRef : null}
              className='mt-7 p-8'
            >
              <h2 className='font-bold text-blue-800 text-xl'>{link.label}</h2>
              <p className='text-justify leading-4'>{link.paragraph}</p>
            </div>
          )
        })
     }
    </div>
  )
}
