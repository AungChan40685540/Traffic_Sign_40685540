import React, { useState, useEffect } from 'react';

const VideoFeed = () => {

  // useEffect(() => {
  //   const videoElement = document.getElementById('video');
  //   videoElement.src = 'http://127.0.0.1:5000/video_feed';
  // }, []);
  // useEffect(() => {
  //   const videoElement = document.getElementById('video');
  //   videoElement.src = 'http://127.0.0.1:5000/video_feed';
  //   videoElement.addEventListener('loadeddata', () => {
  //     videoElement.play();
  //   });
  // }, []);
  useEffect(() => {
    const videoElement = document.getElementById('video');
    videoElement.src = 'http://127.0.0.1:5000/video_feed';
    videoElement.muted = true; // Mute the video to allow autoplay
    videoElement.autoplay = true;
    videoElement.addEventListener('loadeddata', () => {
      videoElement.play();
    });
  }, []);
  
  return (
    <div className=" border-2 px-10 py-5 rounded-xl">
      <h1 className=' text-center text-xl font-thin'>Real-time Traffic Sign Recognition with OpenCv</h1>
      
      <div className=" my-5">
        <img id="video" alt="Video Feed" className=' border ' width="1000" height="480" />
      </div>
    </div>
  );
};

export default VideoFeed;
