import React from 'react'
import { useLocation } from 'react-router-dom'
import { image_prefix } from '../utils/constants';

export default function PublicationDetails() {
  const location = useLocation();
  const selectedPublication = location.state;
  return (
    <div>
          <img src={`${ image_prefix+selectedPublication.image_url}`} alt="Image Publication" className='w-full mt-24 sm:mt-28 md:mt-24 lg:mt-28'/>
      <h2 className='text-xl text-justify sm:text-xl md:text-3xl lg:text-3xl p-4 content-box font-bold text-green-700 capitalize'>{selectedPublication.publication_title}</h2>
      <p className='text-justify px-4 md:px-4 text-base sm:text-lg md:text-xl font-semibold mb-10 leading-7'>
        {selectedPublication.publication_text}
      </p>
    </div>
  )
}
