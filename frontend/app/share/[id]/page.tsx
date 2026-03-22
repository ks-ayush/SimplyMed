"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "next/navigation";

export default function SharePage() {
    const params = useParams();
    const [data, setData] = useState(null);
     const [selectedImage, setSelectedImage] = useState(null);

    useEffect(() => {
        if (!params?.id) return;

        axios
            .get(`http://localhost:5000/share/${params.id}`)
            .then((res) => setData(res.data));
    }, [params]);

    if (!data) return <p>Loading...</p>;

    return (
        <main className="min-h-screen bg-gray-100">

            <h1 className="text-3xl font-bold text-center py-8 text-blue-600">
                Shared Medical Records
            </h1>


            <Section
                title="Prescriptions"
                data={data.prescriptions}
                setSelectedImage={setSelectedImage}
            />

            <Section
                title="Medical Insights"
                data={data.insights}
                setSelectedImage={setSelectedImage}
            />

           
            <Section
                title="Test Reports"
                data={data.tests}
                setSelectedImage={setSelectedImage}
            />

            
            {selectedImage && (
                <div
                    className="fixed inset-0 bg-black/70 flex justify-center items-center z-50"
                    onClick={() => setSelectedImage(null)}
                >
                    <img
                        src={selectedImage}
                        className="max-h-[80%] rounded-lg shadow-lg"
                    />
                </div>
            )}
        </main>
    );
}


const Section = ({ title, data, setSelectedImage }) => {
    return (
        <div className="container mx-auto py-10">

            <h2 className="text-2xl font-bold text-center mb-8 text-blue-600">
                {title}
            </h2>

            {data.length === 0 ? (
                <p className="text-center text-gray-500">
                    No data available.
                </p>
            ) : (
                <div className="mx-3 grid md:grid-cols-3 gap-8">

                    {data.map((item) => (
                        <div
                            key={item._id}
                            className="bg-white shadow-lg rounded-xl overflow-hidden border hover:shadow-2xl transition"
                        >

                            <img
                                src={item.images[0]?.url}
                                alt="record"
                                className="w-full h-48 object-cover cursor-pointer"
                                onClick={() => setSelectedImage(item.images[0]?.url)}
                            />

                            <div className="p-4">
                                <p className="text-gray-800 font-semibold mb-2">
                                    {item.description}
                                </p>

                                <p className="text-gray-400 text-sm">
                                    {new Date(item.createdAt).toLocaleDateString()}
                                </p>
                            </div>

                        </div>
                    ))}

                </div>
            )}
        </div>
    );
};