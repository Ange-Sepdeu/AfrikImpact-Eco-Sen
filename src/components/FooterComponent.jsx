import React from 'react'
import logo from "../assets/logo.jpg"
import CopyrightOutlined from '@mui/icons-material/CopyrightOutlined';
import useWindow from '../utils/useWindow';
import Instagram from '@mui/icons-material/Instagram';
import LinkedIn from "@mui/icons-material/LinkedIn"
import Facebook from "@mui/icons-material/Facebook"
import Twitter from "@mui/icons-material/Twitter"
import Youtube from "@mui/icons-material/YouTube"
import MusicNote from "@mui/icons-material/MusicNote"
import { Link } from 'react-router-dom';

export default function FooterComponent() {
  const windowDimension = useWindow()
  return (
    <>
    <div className='w-full bottom-0 bg-gray-800 text-white'>
      <div className={`flex flex-row justify-evenly items-start flex-wrap w-full p-8 text-2xl text-gray-400`}>
      <img src={logo} alt="Logo" className='rounded-full mb-5 lg:w-1/12' width={"120px"} />
        <div className='mb-5 text-center w-full sm:w-full md:w-4/12 lg:w-4/12'>
            <div className='uppercase'>Contactez-nous</div>
            <div className='flex text-white text-lg flex-col mt-2'>
            <a href="tel:+1 873 755 21">+32 466 35 32 75</a>
            <a href="mailto:com@afrikimpacteconsen.be">com@afrikimpactecosen.be</a>
            </div>
        </div>
        <div className={`w-full sm:w-full md:w-full lg:w-6/12 text-center`}>
          <div>FAQ</div>
          <Link className='text-white hover:ml-10 text-lg' to={"/connexion"}>se connecter</Link>
        </div>
      </div>
      <div className='bg-gray-700 flex flex-row flex-wrap justify-between items-center text-center p-4 text-xl text-gray-100'>
        <Link to={"/politique-de-confidentialité"} className='w-full sm:w-full md:w-6/12 lg:w-4/12 mb-5'>Politique de confidentialité</Link>
        <div className='flex w-10/12 mb-5 m-auto sm:w-full md:w-5/12 lg:w-4/12 text-gray-400 flex-row justify-between items-center'>
            <Instagram className='cursor-pointer hover:text-gray-500' />
            <Link target='_blank' className='cursor-pointer hover:text-gray-500' to={"https://www.linkedin.com/company/afrikimpact-eco-sen/"}>
            <LinkedIn />
            </Link>
            <Link target='_blank' className='cursor-pointer hover:text-gray-500' to={"https://www.youtube.com/channel/UCixsNfmu-JgPJncLjq52JfA"}>
            <Youtube />
            </Link>
            <Link target='_blank' className='cursor-pointer hover:text-gray-500' to={"https://twitter.com/AfrikImpact2024"}>
            <Twitter />
            </Link>
            <Link target='_blank' className='cursor-pointer hover:text-gray-500' to={"https://www.facebook.com/profile.php?id=61559077066977"}>
            <Facebook />
            </Link>
            <MusicNote className='cursor-pointer bg-gray-400 text-gray-800 rounded-md hover:bg-gray-500' />
        </div>
        <div className='w-10/12 sm:w-full md:w-full md:mb-5 lg:w-4/12 m-auto'> <CopyrightOutlined /> 2024 AfrikImpact Eco-Sen</div> 
      </div>
    </div>
    </>
  );
}
