"use client";
import { UserButton } from "@clerk/nextjs";
import { useAuth } from "@clerk/nextjs";
import axios from "axios";
import { useState, useEffect } from "react";
export default function Dashboard() {
  const { userId } = useAuth();

  const [prescriptions, setPrescriptions] = useState([]);
  const [tests, setTests] = useState([]);
  const [insights, setInsights] = useState([]);


  const handleViewAll = async () => {
    try {
      const [pRes, iRes, tRes] = await Promise.all([
        axios.get(`http://localhost:5000/prescriptions/user/${userId}`),
        axios.get(`http://localhost:5000/insights/user/${userId}`),
        axios.get(`http://localhost:5000/tests/user/${userId}`)
      ]);

      setPrescriptions(pRes.data || []);
      setInsights(iRes.data || []);
      setTests(tRes.data || []);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    handleViewAll();
  }, [userId]);


  return (
    <div className="flex min-h-screen justify-center text-black bg-gray-100">


      <aside className="md:w-64 bg-white shadow-md p-6 ">
        <h2 className="text-2xl font-bold mb-8">SimplyMed</h2>

        <nav className="flex flex-col gap-4">
          <a href="/ai" className="hover:text-blue-500 cursor-pointer">AI Assistant</a>
          <a href="/insights" className="hover:text-blue-500 cursor-pointer">Medical Insights</a>
          <a href="/prescriptions" className="hover:text-blue-500 cursor-pointer">Prescriptions</a>
          <a href="/medicaltest" className="hover:text-blue-500 cursor-pointer">Test Analysis</a>
          <a href="/sharelink" className="hover:text-blue-500 cursor-pointer">Share Records</a>
        </nav>
      </aside>

      <main className="flex-1 p-8">


        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl md:text-3xl font-semibold">Dashboard</h1>
          <UserButton afterSignOutUrl="/sign-in" />
        </div>


        <div className="flex flex-col   md:grid grid-cols-3 gap-6 mb-10">

          <div className="bg-white p-6 rounded-xl shadow">
            <h3 className="text-gray-500">Medicines Lists</h3>
            <p className="text-2xl font-bold mt-2">{insights.length}</p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow">
            <h3 className="text-gray-500">Prescriptions</h3>
            <p className="text-2xl font-bold mt-2">{prescriptions.length}</p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow">
            <h3 className="text-gray-500">Test Reports</h3>
            <p className="text-2xl font-bold mt-2">{tests.length}</p>
          </div>

        </div>


        <div className="bg-white p-6 rounded-xl shadow">
          <h2 className="text-xl font-semibold mb-4">Welcome 👋</h2>
          <p className="text-gray-600">
            You are successfully signed in. This is your dashboard.
          </p>
        </div>

      </main>
    </div>
  );
}