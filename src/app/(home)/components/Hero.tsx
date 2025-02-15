"use client";

import React from "react";
import { ArrowRight } from "lucide-react";
import { useRouter } from "next/navigation";

const Hero = () => {
  const router = useRouter();

  const handleGetStarted = () => {
    router.push("/sign-up");
  };

  const handleExplore = () => {
    router.push("/explore");
  };

  return (
    <section className="flex min-h-screen items-center justify-center text-center px-4 py-16">
      <div className="w-full max-w-2xl mx-auto">
        <h1 className="text-5xl sm:text-6xl md:text-7xl font-bold text-white mb-6 leading-tight">
          Your Vision, 
          <br />
          <span className="bg-gradient-to-r from-primary-a0 via-primary-a30 to-primary-a50 text-transparent bg-clip-text font-semibold">Our Expertise</span>
        </h1>

        <div className="flex flex-col sm:flex-row justify-center gap-6">
          <button
            onClick={handleGetStarted}
            className="bg-primary-a50/10 border border-primary-a10/60 hover:bg-primary-a40/20 text-light-a0 py-2 px-6 rounded-lg text-lg font-semibold transition max-w-xs w-fit mx-auto sm:mx-0"
          >
            Get Started <ArrowRight size={20} className="inline ml-2" />
          </button>
          <button
            onClick={handleExplore}
            className="border border-primary-a50/60 bg-primary-a40/10 hover:bg-primary-a50/20 text-neutral-200 py-2 px-6 rounded-lg text-lg font-semibold transition max-w-xs w-fit mx-auto sm:mx-0"
          >
            Explore
          </button>
        </div>
      </div>
    </section>
  );
};

export default Hero;
