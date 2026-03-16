"use client";
import React, { useState } from "react";
import axios from "axios";
import { useAuth } from "@clerk/nextjs";


const InsightsPage = () => {
  const { userId } = useAuth();
  const [add, setAdd] = useState(false);
  const [image, setImage] = useState(null);
  const [description, setDescription] = useState("");
  const [prescriptions, setPrescriptions] = useState([]);
  const [view, setView] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);

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

  const handleViewPrescriptions = async () => {
    try {

      const res = await axios.get(
        `http://localhost:5000/prescriptions/user/${userId}`
      );

      setPrescriptions(res.data);
      setView(true);

    } catch (error) {
      console.log(error);
    }
  };

  const handleDelete = async (id) => {
    try {

      await axios.delete(`http://localhost:5000/prescriptions/${id}`);

      setPrescriptions((prev) =>
        prev.filter((p) => p._id !== id)
      );

      alert("Prescription deleted");

    } catch (error) {
      console.log(error);
    }
  };

  const handleDownload=(url)=> {

    const fileName = url.split("/").pop();

    const link = document.createElement("a");
    link.href = url;
    link.download = fileName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

  };

  return (
    <main className="min-h-screen bg-gray-100">
      <div className="container mx-auto py-10 flex justify-center items-center flex-col">
        <h1 className="text-3xl text-black font-bold mb-6">
          Medical insights Page
        </h1>
        <p className="text-gray-700">
          This is where you can view and manage your medical insights.
        </p>
      </div>

      <div className="flex justify-center">
        <button
          onClick={() => setAdd(true)}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Add Medical Insights
        </button>

        <button onClick={handleViewPrescriptions} className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded ml-4">
          View Medical Insights
        </button>
      </div>

      {add && (
        <div className="container mx-auto py-16 flex justify-center items-center flex-col">

          <h2 className="text-3xl text-blue-600 font-bold mb-6">
            Upload Prescribed Medicines
          </h2>

          <form className="w-full max-w-md bg-white shadow-xl rounded-xl p-6 border">

            <div className="mb-6">
              <label className="block text-gray-700 text-sm font-bold mb-3">
                Prescribed Medicines Image
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
                    Click to Upload Prescribed Medicines Image
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
                className="border border-b-gray-500 my-3.5 h-24 text-black w-full rounded-md pt-2 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
                type="text"
                placeholder="Enter medical insights or notes about the medicines"
              />
            </div>

            <div className="flex justify-center gap-10">
              <button type="button" onClick={handleAddPrescription} className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-6 rounded-lg shadow-md transition" > Save Insights </button>
              <button type="button" onClick={() => setAdd(false)} className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-6 rounded-lg shadow-md transition" > Close </button> </div>

          </form>
        </div>
      )}

      {view && (
        <div className="container mx-auto py-12">

          <h2 className="text-3xl font-bold text-center mb-10 text-blue-600">
            Your Medical Insights
          </h2>

          {prescriptions.length === 0 ? (
            <p className="text-center text-gray-500">
              No medical insights uploaded yet.
            </p>
          ) : (
            <div className="mx-3 grid md:grid-cols-3 gap-8">

              {prescriptions.map((p) => (

                <div
                  key={p._id}
                  className="bg-white shadow-lg rounded-xl overflow-hidden border hover:shadow-2xl transition"
                >

                  <img
                    src={p.images[0].url}
                    alt="prescription"
                    className="w-full h-48 object-cover cursor-pointer"
                    onClick={() => setSelectedImage(p.images[0].url)}
                  />

                  <div className="p-4">

                    <p className="text-gray-800 font-semibold mb-2">
                      {p.description}
                    </p>

                    <p className="text-gray-400 text-sm mb-3">
                      {new Date(p.createdAt).toLocaleDateString()}
                    </p>

                    <div className="flex justify-between">

                      <button
                        onClick={() => handleDownload(p.images[0].url)}
                        className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded"
                      >
                        Download
                      </button>

                      <button
                        onClick={() => handleDelete(p._id)}
                        className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded"
                      >
                        Delete
                      </button>

                    </div>

                  </div>

                </div>

              ))}

            </div>
          )}

        </div>
      )}

      {selectedImage && (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex justify-center items-center z-50">

          <div className="relative bg-white p-4 rounded-lg shadow-xl">

            <button
              onClick={() => setSelectedImage(null)}
              className="absolute top-2 right-2 text-red-500 text-xl font-bold"
            >
              ✕
            </button>

            <img
              src={selectedImage}
              alt="preview"
              className="max-h-[80vh] rounded"
            />

          </div>

        </div>
      )}
    </main>
  );
};

export default InsightsPage;