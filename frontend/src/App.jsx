import React, { useState } from "react";
import VideoFeed from "./components/VideoFeed";
import ImageClassification from "./components/ImageClassification";

const App = () => {
  const [view, setView] = useState("video");

  const handleVideoClick = () => {
    setView("video");
  };

  const handleImageClassifyClick = () => {
    setView("imageClassify");
  };

  return (
    <div className="  px-12 lg:px-32 pt-5 mb-5">
      <h1 className=" text-2xl text-center font-bold">
        Real-time traffic sign classification and recognition system using CNN
      </h1>
      <div className=" text-sm font-medium text-center text-gray-500 rounded-lg grid grid-cols-5 gap-5 py-5">
        <div className=" col-span-2">
          <button
            className=" w-full p-4 text-gray-900 bg-gray-100 border border-gray-200 dark:border-gray-700 rounded-lg focus:shadow-lg focus:shadow-gray-900 focus:bg-black focus:text-white focus:border-black active focus:outline-none dark:bg-gray-700 dark:text-white"
            onClick={handleVideoClick}
          >
            Classify in real-time
          </button>
        </div>
        <div className=" col-span-2">
          <button
            className=" w-full p-4 text-gray-900 bg-gray-100 border border-gray-200 dark:border-gray-700 rounded-lg focus:shadow-lg focus:shadow-gray-900 focus:bg-black focus:text-white focus:border-black active focus:outline-none dark:bg-gray-700 dark:text-white"
            onClick={handleImageClassifyClick}
          >
            Classify with image
          </button>
        </div>
        <div className=" col-span-1">
          <button className=" w-full p-4 text-gray-900 bg-gray-100 border border-gray-200 rounded-lg hover:bg-red-600 hover:text-white duration-300">
            {" "}
            CLOSE{" "}
          </button>
        </div>
      </div>

      {view === "video" && <VideoFeed />}
      {view === "imageClassify" && <ImageClassification />}
    </div>
  );
};

export default App;
