import React from "react";
import image1 from "../assets/images/img1.jpg";
import image2 from "../assets/images/img2.jpg";

const Services = ({ theme, setTheme }) => {
  return (
    <div
      className={`min-h-screen ${ theme === "dark" ? "bg-[#00002B]" : "bg-[#F2F2F2]" } p-6 text-justify flex justify-center items-center md:px-14`}
    >
      <div className={``}>
        <h1 className=" text-4xl py-10 text-center uppercase karla-title text-[#FF1377]">
          Services
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-2  gap-8">
          {/* First Card */}
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <div className=" p-5">
              <h2 className=" text-lg md:text-2xl font-bold mb-4 text-gray-800 ">
                A Traffic Sign Classification with webcam
              </h2>
              <p className="text-gray-600 mb-6">
                Traffic Sign Classification System uses advanced deep learning
                algorithms to improve road safety and driver awareness. The
                system uses camera as  real-time input device, capturing live
                video feeds and processing each frame to identify and classify
                traffic signs on the fly. Built with strong technologies like
                TensorFlow and Keras, system uses Convolutional Neural
                Networks (CNNs) to reliably interpret traffic signals such as
                speed restrictions, stop signs, and warnings.
              </p>
              <button className="bg-[#FF1377] text-white px-4 py-2 rounded-lg">
                Click →
              </button>
            </div>
            <div className="">
              <img
                src={image2}
                alt="Map visualization"
                className="rounded-lg shadow-md h-64 md:h-72 w-full object-cover"
              />
            </div>
          </div>

          {/* Second Service */}
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <div className=" p-5">
              <h2 className="text-lg md:text-2xl font-bold mb-4 text-gray-800">
                A Traffic Sign Classification by image
              </h2>
              <p className="text-gray-600 mb-6">
                Traffic Sign Classification is designed to classify
                traffic signs accurately from static images. By harnessing
                power of deep learning technologies like TensorFlow and Keras,
                the system processes uploaded images to identify and categorize
                traffic signs such as speed limits, stop signs, and directional
                indicators. Using (CNNs), model ensures high precision and reliability, making it an
                essential tool for educational, road safety research,
                and transportation system advancements. 
              </p>
              <button className="bg-[#FF1377]  text-white px-4 py-2 rounded-lg">
                Click →
              </button>
            </div>
            <div className="">
              <img
                src={image1}
                alt="Map visualization"
                className="rounded-lg shadow-md h-64 md:h-72 w-full object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Services;
