import React from "react";
import '../index.css'

const Welcome = ({ theme, setTheme }) => {
  const toggleTheme = (selectedTheme) => {
    setTheme(selectedTheme);
  };
  return (
    <>
      <div className="flex flex-col items-center justify-center text-center space-y-6 lg:py-32 md:py-28 py-24 md:min-h-[730px]">
        <h1 className=" italic text-4xl md:text-5xl karla-title">
          A Traffic Sign Classification{" "}
          <span className=" italic text-[#FF1377]">System</span>
        </h1>
        <p className="text-lg md:text-xl karla-title">
          Teaching machines to understand the language of the road.
        </p>
        <button className="px-8 py-3 bg-[#1E1E59] text-white rounded-full hover:bg-[#FF1377] hover:text-white">
            Get Started
        </button>
        <p className="text-sm md:text-lg uppercase">
          switch to light mode - dark mode
        </p>

        {/* Dark/Light Mode Toggle */}
        <div className="flex space-x-4 pt-1 text-sm">
          <button
            onClick={() => toggleTheme("dark")}
            className="px-6 py-2 bg-[#1E1E59] text-white rounded-lg hover:bg-[#FF1377] hover:text-white"
          >
            Dark
          </button>
          <button
            onClick={() => toggleTheme("light")}
            className="px-6 py-2 bg-[#F2F2F2] text-black rounded-lg hover:bg-[#FF1377] hover:text-white"
          >
            Light
          </button>
        </div>

        {/* Scroll Indicator */}
        <p className="mt-12 text-sm animate-pulse">Scroll to explore ↓</p>
      </div>
    </>
  );
};

export default Welcome;
