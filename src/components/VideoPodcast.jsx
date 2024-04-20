import React, { useEffect } from 'react'
import ArrowForward from "@mui/icons-material/ArrowForward"
import video1 from "../assets/videos/video_1.mp4"
import {useSelector, useDispatch} from "react-redux";
import {getViewableVideos, selectVideos} from "../redux/app/index.slice";
import axiosInstance from '../axiosInstance/axiosInstance';
import {useNavigate} from "react-router-dom";

export default function VideoPodcast() {
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(getViewableVideos())
  })
  const navigate = useNavigate();
  const videos = useSelector(selectVideos);
  const firstVideoUrl = axiosInstance.getUri()+"/static/"+videos[videos?.length-1]?.video_url;
  const handleNavigate = () => {
    navigate("/toutes-videos")
  }
  return (
    <div>
    <div className="flex flex-row flex-wrap justify-between items-center w-11/12 m-auto border-b-2 p-4 border-green-700 text-xl sm:text-2xl lg:text-4xl font-bold text-green-700 mt-10">
    <h2>Vidéos / Blogs</h2>
    <div onClick={() => handleNavigate()} className='cursor-pointer'>
      Tous <ArrowForward className='hover:translate-x-1'/>
    </div>
    </div>
    <div className='mt-10'></div>
    <div className="mb-10 flex flex-row justify-between items-center w-11/12 flex-wrap m-auto self-center">
    {/* <video src={firstVideoUrl} className='m-auto' controls width={"95%"} height={"480"} /> */}
    <video src={video1} className='m-auto' controls width={"95%"} height={"480"} />
    </div>
    </div>
  )
}
