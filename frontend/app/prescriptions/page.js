"use client";
import React, { useState } from "react";
import axios from "axios";
import { useAuth } from "@clerk/nextjs";


const PrescriptionPage = () => {
  const { userId } = useAuth();
  const [add, setAdd] = useState(false);
  const [image, setImage] = useState(null);
  const [description, setDescription] = useState("");

  const handleAddPrescription = async () => {

    if (!description) {
      alert("Please enter a description for the prescription to identify it.");
      return;
    }

    if (!image) {
      alert("Please select a prescription image before uploading.");
      return;
    }

    try {
      const formData = new FormData();
      formData.append("userId", userId || "");
      formData.append("description", description);
      formData.append("image", image);


      const res = await axios.post(
        "http://localhost:5000/prescriptions/upload",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      console.log("Prescription uploaded successfully:", res.data);
      alert("Prescription uploaded successfully");

      setImage(null);
      setDescription("");
      setAdd(false);

    } catch (error) {
      console.error("Error uploading prescription:", error);
      alert("Upload failed");
    }
  };

  return (
    <main className="min-h-screen bg-gray-100">
      <div className="container mx-auto py-10 flex justify-center items-center flex-col">
        <h1 className="text-3xl text-black font-bold mb-6">
          Prescription Page
        </h1>
        <p className="text-gray-700">
          This is where you can view and manage your prescriptions.
        </p>
      </div>

      <div className="flex justify-center">
        <button
          onClick={() => setAdd(true)}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Add Prescription
        </button>

        <button className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded ml-4">
          View Prescriptions
        </button>
      </div>

      {add && (
        <div className="container mx-auto py-16 flex justify-center items-center flex-col">

          <h2 className="text-3xl text-blue-600 font-bold mb-6">
            Upload Prescription
          </h2>

          <form className="w-full max-w-md bg-white shadow-xl rounded-xl p-6 border">

            <div className="mb-6">
              <label className="block text-gray-700 text-sm font-bold mb-3">
                Prescription Image
              </label>

              <label className="flex flex-col items-center justify-center w-full h-40 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-blue-400 transition">

                {image ? (
                  <img
                    src={URL.createObjectURL(image)}
                    alt="preview"
                    className="h-32 object-contain"
                  />
                ) : (
                  <span className="text-gray-500 text-sm">
                    Click to Upload Prescription Image
                  </span>
                )}


                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={(e) => {
                    const file = e.target.files[0];
                    setImage(file);
                  }}
                />
              </label>
              {image && (
                <button className="mt-1 text-red-400" onClick={() => setImage(null)}>Remove</button>
              )}

              <input
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="border border-b-gray-500 my-3.5 text-black w-full rounded-md pt-2 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
                type="text"
                placeholder="Enter prescription description"
              />
            </div>

            <div className="flex justify-center gap-10">
              <button type="button" onClick={handleAddPrescription} className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-6 rounded-lg shadow-md transition" > Save Prescription </button>
              <button type="button" onClick={() => setAdd(false)} className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-6 rounded-lg shadow-md transition" > Close </button> </div>

          </form>
        </div>
      )}
    </main>
  );
};

export default PrescriptionPage;