// import { useEffect } from "react";

// const VideoFeed = () => {
//   useEffect(() => {
//     const videoElement = document.getElementById("video");
//     videoElement.src = "http://127.0.0.1:5000/video_feed";
//     videoElement.muted = true; // Mute the video to allow autoplay
//     videoElement.autoplay = true;
//     videoElement.addEventListener("loadeddata", () => {
//       videoElement.play();
//     });
//   }, []);

//   return (
//     <div className=" border-2 px-10 py-5 rounded-xl flex justify-center mt-8">
//       <div className=" my-3 justify-center">
//         <h1 className=" text-center text-xl font-thin">
//           Traffic Sign Recognition with OpenCv
//         </h1>
//         <img
//           id="video"
//           alt="Video Feed"
//           className=" border-4 border-emerald-800 rounded-lg w-full h-full"
//         />
//       </div>
//     </div>
//   );
// };

// export default VideoFeed;
import axios from 'axios';
import React, { useEffect, useState } from 'react'

const VideoFeed = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [videoSource, setVideoSource] = useState('');

  const startVideo = () => {
    setIsOpen(true);
    setVideoSource(`http://127.0.0.1:5000/video_feed?timestamp=${new Date().getTime()}`);
  };

  const stopVideo = async () => {
    try {
      await axios.post('http://127.0.0.1:5000/stop_feed');
      setIsOpen(false);
      setVideoSource('');
    } catch (error) {
      console.error('Error stopping video feed', error);
    }
  }


  useEffect(() => {
    // Clean up video feed when the component unmounts
   
  }, [isOpen]); 


  return (
        <>
          <button onClick={ startVideo}> Start </button>
          <button onClick={ stopVideo}> Stop</button>
          
          {isOpen && (
             <div className=''>
             <img src={videoSource} alt="Video Feed" className=' h-96' />
           </div>
          )}
         
        </>
     
  );
}

export default VideoFeed
