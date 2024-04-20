import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getViewableVideos, selectVideos } from '../redux/app/index.slice';
import axiosInstance from '../axiosInstance/axiosInstance';

export default function CompleteVideo() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getViewableVideos());
  })
  const videos = useSelector(selectVideos);
  return (
    <div className='mt-32 mb-48'>
      <h2 className='text-green-700 text-3xl px-8 py-4 font-bold'>Toutes les videos</h2>
      <div className='flex flex-row justify-between items-center flex-wrap'>
      {
        [...videos].map((video, index) => {
          const video_url = axiosInstance.getUri()+"/static/"+video.video_url;
          return (
            <div key={index} className='w-full sm:w-full md:w-6/12 lg:w-4/12 p-4'>
            <div className='text-green-700 text-sm'>{video.video_title}</div>
            <video src={video_url} className='m-auto' controls width={"90%"} height={"480"} />
            </div>
          )
        })
      }
      </div>
    </div>
  )
}
