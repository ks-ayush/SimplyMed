"use client";

import React, { useState } from "react";
import dynamic from "next/dynamic";

const HospitalMap = dynamic(
  () => import("../components/HospitalMap"),
  {
    ssr: false,
  }
);

const MapPage = () => {
  const [location, setLocation] = useState({
    lat: 25.5941,
    lng: 85.1376,
  });

  const handlemap = () => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setLocation({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        });
      },
      (error) => {
        console.log(error);
      }
    );
  };

  return (
    <main className="min-h-screen bg-gray-100">
      <div className="container mx-auto px-4 py-4 text-center border-2 border-gray-300 rounded-lg bg-white shadow-md mb-8">
        <h1 className="text-4xl font-bold text-gray-800">
          SimplyMed Map
        </h1>
        <p className="text-gray-600 mt-2">
          Find nearby hospitals and pharmacies locations
        </p>
      </div>

      <section className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="flex flex-col items-center justify-center">
          <h1 className="text-2xl font-bold text-black">
            Find nearby hospitals and pharmacies
          </h1>

          <button
            onClick={handlemap}
            className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Share Location
          </button>

          <div className="mt-4 text-black">
            <p>Latitude: {location.lat}</p>
            <p>Longitude: {location.lng}</p>
          </div>
        </div>

        <div className="px-10">
          <HospitalMap
            lat={location.lat}
            lng={location.lng}
          />
        </div>
      </section>
    </main>
  );
};

export default MapPage;