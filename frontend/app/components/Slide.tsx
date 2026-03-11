"use client";
import { useState } from "react";
import { useEffect } from "react";

export default function FeatureCarousel() {
  const features = [
    {
      title: "Manage Medical Records Easily",
      desc: "Store and organize prescriptions, medicine lists, and doctor advice in one secure place. Never lose important health records again.",
      
    },
    {
      title: "Share Records with Secure Links",
      desc: "Generate shareable links for prescriptions and medical documents so doctors or family members can quickly access past records.",
      
    },
    {
      title: "AI Medical Assistance",
      desc: "Get AI-powered insights on doctor advice and medications to better understand treatments and possible precautions.",
      
    },
  ];

  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % features.length);
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  const prevSlide = () => {
    setIndex((prev) => (prev === 0 ? features.length - 1 : prev - 1));
  };

  const nextSlide = () => {
    setIndex((prev) => (prev === features.length - 1 ? 0 : prev + 1));
  };

  return (
    <div className="w-full flex flex-col items-center justify-center py-16 bg-gray-100">

      

      <div className="relative w-[90%] md:w-[90%]">

        
        <div className="bg-black rounded-2xl shadow-lg p-10 text-center transition-all duration-500">

          
          <h3 className="text-xl text-blue-400 font-semibold mb-3">
            {features[index].title}
          </h3>

          <p className="text-white-600">
            {features[index].desc}
          </p>

        </div>

        
        <button
          onClick={prevSlide}
          className="absolute top-1/2 -left-6 transform -translate-y-1/2 bg-blue-600 shadow px-3 py-2 rounded-full hover:bg-blue-400"
        >
          ←
        </button>

        <button
          onClick={nextSlide}
          className="absolute top-1/2 -right-6 transform -translate-y-1/2 bg-blue-600 shadow px-3 py-2 rounded-full hover:bg-blue-400"
        >
          →
        </button>

      </div>

      <div className="flex gap-3 mt-6">
        {features.map((_, i) => (
          <div
            key={i}
            className={`h-3 w-3 rounded-full ${
              i === index ? "bg-blue-500" : "bg-gray-300"
            }`}
          ></div>
        ))}
      </div>

    </div>
  );
}