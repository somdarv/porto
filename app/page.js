import React from "react";
import Navigation from "./components/Navigation";
import Footer from "./Footer";

export default function page() {
  return (
    <div className="landbg min-h-screen flex flex-col justify-between">
      <Navigation page={"home"} />

      {/* main content */}
      <div className="justify-center h-80% my-auto bg-red-">
        <h1
          style={{
            fontFamily: "Behind-The-Nineties, sans-serif",
            color: "white",
          }}
          className="leading-none text-white text-[100px] text-center"
        >
          Create a portfolio that <br /> makes you stand out
        </h1>

        <p className="text-white text-xl text-center my-2 w-[50%] mx-auto">
          Setting up your own portfolio website is a fantastic way to express
          who you are as a creative, and to share your talents with the world.
        </p>
        <div className="flex my-6 justify-center">
          <button className="bg-white px-6 my-2 py-4 hover:text-white hover:bg-primary rounded-full font-semibold text--sm ">
            Create Yours Now
          </button>
        </div>
      </div>

      <Footer />
    </div>
  );
}
