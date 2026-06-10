"use client";

import React, { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import axios from "axios";

const HospitalMap = dynamic(
  () => import("../components/HospitalMap"),
  {
    ssr: false,
  }
);

interface Place {
  properties: {
    place_id: string;
    name?: string;
    categories?: string[];
  };
  geometry: {
    coordinates: [number, number];  
  };
}

export default function MapPage() {
  const [location, setLocation] = useState({
    lat: 25.5941,
    lng: 85.1376,
  });

  const [hospitals, setHospitals] = useState<Place[]>([]);
  const [hasLocation, setHasLocation] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleMap = () => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setLocation({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        });

        setHasLocation(true);
      },
      (error) => {
        console.error(error);
      }
    );
  };

  const fetchNearbyPlaces = async () => {
    try {
      setLoading(true);

      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/nearby`,
        {
          params: {
            lat: location.lat,
            lng: location.lng,
          },
        }
      );

      console.log(response.data);

      setHospitals(response.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (hasLocation) {
      fetchNearbyPlaces();
    }
  }, [location, hasLocation]);

  return (
    <main className="min-h-screen bg-gray-100">
      <div className="container mx-auto px-6 py-4 text-center border-2 border-gray-300 rounded-lg bg-white shadow-md mb-8">
        <h1 className="text-4xl font-bold text-gray-800">
          SimplyMed Map
        </h1>

        <p className="text-gray-600 mt-2">
          Find nearby hospitals and pharmacies
        </p>
      </div>

      <section className="grid grid-cols-1 md:grid-cols-2 gap-8 py-6">
        <div className="flex flex-col border-4 rounded-2xl mx-2.5 border-gray-300 items-center justify-start p-4">
          <h1 className="text-2xl font-bold text-black text-center">
            Find Nearby Hospitals & Pharmacies
          </h1>

          <button
            onClick={handleMap}
            className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Share Location
          </button>

          <div className="w-full border-2 border-blue-500 rounded-lg bg-white p-4 mt-8 max-h-96 overflow-y-auto">
            <h2 className="text-center font-bold text-lg text-black mb-3">
              Nearby Facilities
            </h2>

            {loading ? (
              <p className="text-center text-black">
                Loading nearby facilities...
              </p>
            ) : hospitals.length === 0 ? (
              <p className="text-center text-black">
                No facilities found
              </p>
            ) : (
              hospitals.map((hospital) => (
                <div
                  key={hospital.properties.place_id}
                  className="border rounded p-3 mb-2 text-black"
                >
                  <h3 className="font-semibold">
                    {hospital.properties.name ||
                      "Unnamed Facility"}
                  </h3>

                  <p className="text-sm text-gray-600">
                    {hospital.properties.categories?.[0] ||
                      "Healthcare Facility"}
                  </p>
                </div>
              ))
            )}
          </div>

          <div className="w-full border-2 border-blue-500 rounded-lg bg-white mt-6 p-2">
            <input
              type="text"
              placeholder="Search Hospitals"
              className="w-full outline-none text-black"
            />
          </div>
        </div>

        <div className="px-4">
          <HospitalMap
            lat={location.lat}
            lng={location.lng}
            hospitals={hospitals}
          />
        </div>
      </section>
    </main>
  );
}