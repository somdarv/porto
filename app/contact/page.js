import React from "react";
import Navigation from "../components/Navigation";
import Footer from "../Footer";

export default function page() {
  return (
    <>
      <div className="w-full bg-[#082431]">
        <Navigation page={"contact"} />
      </div>

      <div className="w-[80%] mx-auto">
        <h1 className="font-semibold my-8 text-3xl ">Contact </h1>

        <h1
          style={{
            fontFamily: "Behind-The-Nineties, sans-serif",
            color: "black",
          }}
          className="leading-none my-16 text-white text-6xl text-start"
        >
         Talk To Us
        </h1>

        <div className="w-full items-center flex justify-between">
          <div className="w-[40%]">
            <h1 className="font-semibold">Build Your Website</h1>
            <p className="mt-2">
            Reach us via mail, or phone any day any time. Our support
are here to respond 24/7 Page with email, phone number address.

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
