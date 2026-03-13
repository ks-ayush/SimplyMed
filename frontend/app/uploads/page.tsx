"use client";
import React from "react";
import { useAuth } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import MagicBento from "../components/upl";

const UploadPage: React.FC = () => {
  const { isSignedIn, isLoaded } = useAuth();
  const router = useRouter();

  if (!isLoaded) return null;

  if (!isSignedIn) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-purple-950 via-black to-indigo-950">
        <div className="backdrop-blur-md bg-white/10 border border-white/20 rounded-2xl shadow-2xl p-10 text-center max-w-md w-full">
          <h1 className="text-3xl font-bold text-white mb-4">
            🔒 Access Restricted
          </h1>
          <p className="text-gray-300 mb-8">
            You need to sign in to upload and use this feature.
          </p>

          <button
            onClick={() => router.push("/sign-in")}
            className="px-6 py-3 rounded-lg bg-linear-to-r from-purple-500 to-indigo-500 text-white font-semibold shadow-lg hover:scale-105 hover:from-purple-600 hover:to-indigo-600 transition-all duration-300"
          >
            Sign In
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex justify-center pt-3.5">
      <MagicBento
        textAutoHide={true}
        enableStars
        enableSpotlight
        enableBorderGlow={true}
        enableTilt={false}
        enableMagnetism={false}
        clickEffect
        spotlightRadius={400}
        particleCount={12}
        glowColor="132, 0, 255"
        disableAnimations={false}
      />
    </div>
  );
};

export default UploadPage;