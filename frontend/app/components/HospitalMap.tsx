"use client";

import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMap,
} from "react-leaflet";
import { useEffect } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";


delete (L.Icon.Default.prototype as any)._getIconUrl;

L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  iconUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  shadowUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
});

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

interface HospitalMapProps {
  lat: number;
  lng: number;
  hospitals: Place[];
}

function ChangeView({
  center,
}: {
  center: [number, number];
}) {
  const map = useMap();

  useEffect(() => {
    map.setView(center, 13);
  }, [center, map]);

  return null;
}

export default function HospitalMap({
  lat,
  lng,
  hospitals,
}: HospitalMapProps) {
  return (
    <MapContainer
      center={[lat, lng]}
      zoom={13}
      style={{
        height: "600px",
        width: "100%",
      }}
    >
      <ChangeView center={[lat, lng]} />

      <TileLayer
        attribution="&copy; OpenStreetMap contributors"
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      
      <Marker position={[lat, lng]}>
        <Popup>
          <div>
            <h3 className="font-bold">Your Location</h3>
            <p>
              {lat.toFixed(4)}, {lng.toFixed(4)}
            </p>
          </div>
        </Popup>
      </Marker>

    
      {hospitals.map((hospital) => {
        const [lngCoord, latCoord] =
          hospital.geometry.coordinates;

        return (
          <Marker
            key={hospital.properties.place_id}
            position={[latCoord, lngCoord]}
          >
            <Popup>
              <div>
                <h3 className="font-bold">
                  {hospital.properties.name ||
                    "Unnamed Facility"}
                </h3>

                <p>
                  Type:{" "}
                  {hospital.properties.categories?.[0] ||
                    "Healthcare Facility"}
                </p>

                <p>
                  Lat: {latCoord.toFixed(4)}
                </p>

                <p>
                  Lon: {lngCoord.toFixed(4)}
                </p>
              </div>
            </Popup>
          </Marker>
        );
      })}
    </MapContainer>
  );
}
