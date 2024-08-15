import React from "react";
import Navigation from "../components/Navigation";
import Footer from "../Footer";

export default function page() {
  return (
    <>
      <div className="w-full bg-[#082431]">
        <Navigation page={"about"} />
      </div>

      <div className="w-[80%] mx-auto">
        <h1 className="font-semibold my-8 text-3xl ">About </h1>

        <h1
          style={{
            fontFamily: "Behind-The-Nineties, sans-serif",
            color: "black",
          }}
          className="leading-none my-16 text-white text-6xl text-start"
        >
          One platform, <br />
          infinite possibilities
        </h1>

        <div className="w-full items-center flex justify-between">
          <div className="w-[30%]">
            <h1 className="font-semibold">Build Your Website</h1>
            <p className="mt-2">
              Design with a full suite of intuitive tools and powerful AI to
              create the site you want.
            </p>
          </div>
          <div className="w-[30%]">
            <h1 className="font-semibold">Manage your business</h1>
            <p className="mt-2">
              Streamline your day-to-day with built-in business solutions,
              tailored to your needs.
            </p>
          </div>
          <div className="w-[30%]">
            <h1 className="font-semibold">Grow Online</h1>
            <p className="mt-2">
              Expand your reach and monetize your website with integrated tools
              built for your success.
            </p>
          </div>
        </div>

        <div className="flex justify-start">
          <button className="px-6 my-20 py-4 bg-[#082431] text-white hover:bg-opacity-85 rounded-full font-semibold text--sm ">
            Get Started
          </button>
        </div>
      </div>

      <Footer style={{ color: 'black' }} />

    </>
  );
}
