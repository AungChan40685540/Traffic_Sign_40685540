import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Welcome from "../components/Welcome";
import { FaBars } from "react-icons/fa";
import Gallery from "../components/Gallery";


const Home = () => {
  const navigate = useNavigate();

 

  const trafficSignSystem = () => {
    navigate("/system");
  };

  const [theme, setTheme] = useState("dark");
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div>
      <div
        className={`${
          theme === "dark"
            ? "bg-[#00002B] text-[#F2F2F2]"
            : "bg-[#F2F2F2] text-[#00002B]"
        } `}
      >
        {/* Header */}
        <div className=" md:py-7 md:px-16">
        <header
          className={`w-full grid grid-cols-2 lg:grid-cols-4 items-center gap-4 ${
            theme === "dark" ? "bg-[#1E1E59]" : "bg-[#FF1377] text-[#F2F2F2]"
          } p-4 md:rounded-lg`}
        >
          <div className={`text-3xl font-bold text-center md:text-left`}>
            COSMOS
          </div>

          {/* Navigation */}
          <nav className=" lg:col-span-2 ">
            <div
              className="lg:hidden text-white text-end"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <button className=" px-7 py-2 bg-[#FF1377] rounded-md">
                {" "}
                <FaBars />
              </button>
            </div>

            <div className={` justify-center space-x-6 hidden lg:flex`}>
              <button
                className={`text-sm ${
                  theme === "dark"
                    ? "hover:text-[#FF1377]"
                    : "hover:scale-110 hover:font-bold transition-transform duration-300"
                }`}
                onClick={trafficSignSystem}
              >
                Video Classification
              </button>
              <button
                className={`text-sm ${
                  theme === "dark"
                    ? "hover:text-[#FF1377]"
                    : "hover:scale-110 hover:font-bold transition-transform duration-300"
                }`}
              >
                About
              </button>
              <button
                className={`px-4 py-2 ${
                  theme === "dark"
                    ? "bg-[#F2F2F2] text-black"
                    : "bg-[#00002B] text-white"
                } rounded-full hover:bg-[#FF1377] hover:text-white`}
              >
                Log In
              </button>
              <button
                className={`px-4 py-2 border rounded-full ${
                  theme === "dark"
                    ? "border-[#F2F2F2] text-[#F2F2F2]"
                    : "border-[#00002B] text-[#00002B]"
                } hover:bg-[#FF1377] hover:text-white`}
              >
                Sign Up
              </button>
            </div>
          </nav>
        </header>
        </div>
        

        {/* Main Content */}
        <Welcome theme={theme} setTheme={setTheme} />

        {/* Traffic Sign */}
        <Gallery theme={theme} setTheme={setTheme} />
       
      </div>
    </div>
  );
};

export default Home;
