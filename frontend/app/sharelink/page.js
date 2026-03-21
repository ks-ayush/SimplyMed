"use client"
import React from 'react'
import { useState } from 'react';
import axios from "axios";
import { useAuth } from "@clerk/nextjs";
const SharePage = () => {
    const { userId } = useAuth();
    const [insights, setInsights] = useState([]);
    const [prescriptions, setPrescriptions] = useState([]);
    const [tests, setTests] = useState([]);
    const [viewp, setViewp] = useState(false);
    const [viewi, setViewi] = useState(false);
    const [viewt, setViewt] = useState(false);
    const [selectedImage, setSelectedImage] = useState(null);

   

    const handleViewAll = async () => {
        try {
            const [pRes, iRes, tRes] = await Promise.all([
                axios.get(`http://localhost:5000/prescriptions/user/${userId}`),
                axios.get(`http://localhost:5000/insights/user/${userId}`),
                axios.get(`http://localhost:5000/tests/user/${userId}`)
            ]);

            setPrescriptions(pRes.data);
            setInsights(iRes.data);
            setTests(tRes.data);

            setViewp(true);
            setViewi(true);
            setViewt(true);
        } catch (err) {
            console.log(err);
        }
    };


    return (
        <main className='min-h-screen bg-gray-100'>
            <div className="container mx-auto py-10 flex justify-center items-center flex-col">
                <h1 className="text-3xl text-black font-bold mb-6">
                    View All Uploads
                </h1>
                <p className="text-gray-700">
                    This is where you can view all your uploads. You can also share the records with your doctor or family members.
                </p>
            </div>

            <div className="flex justify-center">

                <button onClick={handleViewAll} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ml-4">
                    View All Uploads
                </button>
            </div>

            {viewp && (
                <div className="container mx-auto py-12">

                    <h2 className="text-3xl font-bold text-center mb-10 text-blue-600">
                        Your Prescriptions
                    </h2>

                    {prescriptions.length === 0 ? (
                        <p className="text-center text-gray-500">
                            No prescriptions uploaded yet.
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

                                        

                                    </div>

                                </div>

                            ))}

                        </div>
                    )}

                </div>
            )}

            {viewi && (
                <div className="container mx-auto py-12">

                    <h2 className="text-3xl font-bold text-center mb-10 text-blue-600">
                        Your Medical Insights
                    </h2>

                    {insights.length === 0 ? (
                        <p className="text-center text-gray-500">
                            No medical insights uploaded yet.
                        </p>
                    ) : (
                        <div className="mx-3 grid md:grid-cols-3 gap-8">

                            {insights.map((p) => (

                                <div
                                    key={p._id}
                                    className="bg-white shadow-lg rounded-xl overflow-hidden border hover:shadow-2xl transition"
                                >

                                    <img
                                        src={p.images[0].url}
                                        alt="insight"
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

                                        

                                    </div>

                                </div>

                            ))}

                        </div>
                    )}

                </div>
            )}

            {viewt && (
                <div className="container mx-auto py-12">

                    <h2 className="text-3xl font-bold text-center mb-10 text-blue-600">
                        Your Medical Tests reports
                    </h2>

                    {tests.length === 0 ? (
                        <p className="text-center text-gray-500">
                            No medical tests reports uploaded yet.
                        </p>
                    ) : (
                        <div className="mx-3 grid md:grid-cols-3 gap-8">

                            {tests.map((p) => (

                                <div
                                    key={p._id}
                                    className="bg-white shadow-lg rounded-xl overflow-hidden border hover:shadow-2xl transition"
                                >

                                    <img
                                        src={p.images[0].url}
                                        alt="test report"
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

                                        

                                    </div>

                                </div>

                            ))}

                        </div>
                    )}

                </div>
            )}
      


        </main>
    )
}

export default SharePage
