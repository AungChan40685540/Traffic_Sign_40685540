import React, { useState } from 'react';
import VideoFeed from './components/VideoFeed';
import ImageClassification from './components/ImageClassification';

const App = () => {
  const [view, setView] = useState('video');

  const handleVideoClick = () => {
    setView('video');
  };

  const handleImageClassifyClick = () => {
    setView('imageClassify');
  };

  return (
    <div className='  px-12 lg:px-32 pt-5 mb-5'>
      <h1 className=' text-2xl text-center font-bold'>Real-time traffic sign classification and recognition system using CNN</h1>
      <div className=' text-sm font-medium text-center text-gray-500 rounded-lg grid grid-cols-2 gap-5 py-5' >
        <div>
          <button className=' w-full p-4 text-gray-900 bg-gray-100 border border-gray-200 dark:border-gray-700 rounded-lg focus:ring-4 focus:ring-blue-300 active focus:outline-none dark:bg-gray-700 dark:text-white' onClick={handleVideoClick}>Classify in real-time</button>
        </div>
        <div>
          <button className=' w-full p-4 text-gray-900 bg-gray-100 border border-gray-200 dark:border-gray-700 rounded-lg focus:ring-4 focus:ring-blue-300 active focus:outline-none dark:bg-gray-700 dark:text-white' onClick={handleImageClassifyClick}>Classify with image</button>
        </div>
      </div>

      {view === 'video' && <VideoFeed />}
      {view === 'imageClassify' && <ImageClassification />}
    </div>
  );
};

export default App;

