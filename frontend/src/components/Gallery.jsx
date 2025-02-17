import React from "react";
import image1 from "../assets/images/img1.jpg";
import image2 from "../assets/images/img2.jpg";
import image3 from "../assets/images/img3.jpg";
import image4 from "../assets/images/img4.jpg";
import image5 from "../assets/images/img5.jpg";
import image6 from "../assets/images/img6.png";

const Gallery = ({ theme, setTheme }) => {
  const images = [image1, image2, image3, image4, image5, image6];
  return (
    <>
      <div
        className={`px-5 lg:px-24 py-5 w-full md:min-h-screen ${
          theme === "dark" ? "text-black bg-white" : " text-[#1E1E59] bg-white"
        }  `}
      >
        <div className="">
          <h1 className={`karla-title text-2xl my-5 uppercase  ${ theme === "dark" ? "text-[#FF1377]" : "text-[#1E1E59]"} `}>
            {" "}
            Gallery of Traffic Signs Art{" "}
          </h1>
          <p className=" karala-title text-justify mb-5">
            <span className={`font-bold text-lg  ${ theme === "dark" ? "text-[#1E1E59]" : "text-[#1E1E59]"} `}> Traffic sign classification </span> system will detect the road traffic
            signs and classify those signs by using the CNN model (which can
            perform most of the computer vision and has a high recognition rate)
            with the help of TensorFlow and Keras which is a deep-learning
            framework. CNN model will be applied to train the models using
            various methods such as converting to grey images, enabling one hot
            encoding, doing data augmentation, and making the layers to make the
            CNN model. Generating the classifier file by using CNN with the help
            of TensorFlow and Keras Frameworks. The system will accurately
            classify the traffic signs and help the drivers & automated vehicles
            in making decisions, reducing the likelihood of an accident and
            improving road safety.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 w-full space-y-7 sm:space-y-0 md:space-y-0">
            {images.map((src, index) => (
              <div key={index}>
                <img
                  className={`w-full rounded-lg object-cover sm:h-72 md:h-60
                      ${theme === "dark" ? "" : "shadow-md shadow-black"}
                      `}
                  src={src}
                  alt={`Gallery item ${index + 1}`}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Gallery;
