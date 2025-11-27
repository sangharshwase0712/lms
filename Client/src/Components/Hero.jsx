import React from "react";
import { Award, Search, User } from "lucide-react";
import HeroImg from "../assets/Hero.png";
import CountUp from "react-countup";

function Hero() {
  return (
    <div className="bg-slate-800 pt-14">
      <div className="lg:h-[700px] max-w-7xl mx-auto flex md:flex-row flex-col items-center  gap-10 ">
        {/* text section */}
        <div className="space-y-7 px-4 md:px-0">
          <h1 className="text-4xl font-extrabold text-gray-200 mt-10 md:mt-0 md:text-6xl">
            Explore Our <span className="text-blue-500">15000+</span> <br />{" "}
            Online Courses for all <br /> and Unlock Your Potential <br /> with
            Learnova.
          </h1>
          <p className="text-gray-300 text-lg">
            Join Learnova today and embark on a journey of knowledge and growth
            with our extensive range of online courses.
          </p>
          <div className="inline-flex relative">
            <input
              type="text"
              placeholder="Search Your Course Here..."
              className="bg-gray-200 w-[350px] md:w-[450px] 
                    text-gray-800 p-4 pr-40 rounded-lg rounded-r-xl placeholder:text-gray-500"
            />
            <button
              className="px-4 py-[14px] flex gap-1 items-center bg-blue-500 font-semibold absolute
                    right-0 text-white rounded-r-lg text-xl"
            >
              Search <Search width={20} height={20} />
            </button>
          </div>
        </div>
        {/* image */}
        <div className="flex md:h-[700px] items-end relative px-4 md:px-0">
          <img
            src={HeroImg}
            alt=""
            className="w-[750px] shadow-blue-500 drop-shadow-lg"
          />
          <div className="bg-slate-200 hidden md:flex gap-3 items-center rounded-md absolute top-[35%] right-0 px-4 py-2">
            <div className="rounded-full bg-blue-400 p-2 text-white">
              <User />
            </div>
            <div>
              <h2 className="font-bold text-2xl">
                <CountUp end={3500} />+
              </h2>
              <p className="italic text-sm text-gray-600 leading-none">
                Active Students
              </p>
            </div>
          </div>

          <div className="bg-slate-200 hidden md:flex gap-3 items-center rounded-md absolute top-[8%] left-[-30px] px-4 py-2">
            <div className="rounded-full bg-blue-400 p-2 text-white">
              <Award />
            </div>
            <div>
              <h2 className="font-bold text-2xl">
                <CountUp end={850} />+
              </h2>
              <p className="italic text-sm text-gray-600 leading-none">
                Certified Students
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Hero;
