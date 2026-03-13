"use client";
import FeatureCarousel from "./components/Slide";
import ScrollStack, { ScrollStackItem } from "./components/scroll";
import { useRouter } from "next/navigation";
export default function Home() {
  const router = useRouter();
  return (

    <main className="relative min-h-screen overflow-hidden bg-linear-to-br from-blue-50 via-white to-blue-100">

      <div className="absolute -top-40 -left-40 w-125 h-125 bg-blue-400 opacity-20 blur-3xl rounded-full"></div>
      <div className="absolute bottom-0 right-0 w-125 h-125 bg-purple-400 opacity-20 blur-3xl rounded-full"></div>

      <div className="absolute inset-0 
      bg-[linear-gradient(to_right,#e5e7eb_1px,transparent_1px),linear-gradient(to_bottom,#e5e7eb_1px,transparent_1px)]
      bg-size-[60px_60px] opacity-30"></div>

      <div className="relative z-10">

        <section className="text-center pt-24 pb-16 px-6">
          <h1 className="text-5xl font-bold text-gray-800 leading-tight">
            Your Medical Records
            <span className="text-blue-500"> Organized & Secure</span>
          </h1>

          <p className="mt-6 text-gray-600 max-w-2xl mx-auto text-lg">
            SimplyMed helps you store prescriptions, share medical records securely,
            and understand treatments with AI assistance.
          </p>

          <div className="mt-8 flex justify-center gap-4">
            <button onClick={()=> router.push("/uploads") } className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition">
              Get Started
            </button>

            <button className="px-6 py-3 border text-black border-gray-300 rounded-lg hover:bg-gray-100 transition">
              Learn More
            </button>
          </div>

        </section>


        <div className="flex justify-center px-6 pb-16">
          <FeatureCarousel />
        </div>

        <section className="grid md:grid-cols-3 gap-8 px-10 pb-24">

          <div className="backdrop-blur-lg bg-white/70 border border-white/40 rounded-xl p-6 shadow-lg">
            <h3 className="text-xl font-semibold text-blue-500">Secure Storage</h3>
            <p className="text-gray-600 mt-2">
              Upload prescriptions and keep your entire medical history safe in one place.
            </p>
          </div>

          <div className="backdrop-blur-lg bg-white/70 border border-white/40 rounded-xl p-6 shadow-lg">
            <h3 className="text-xl font-semibold text-blue-500">Easy Sharing</h3>
            <p className="text-gray-600 mt-2">
              Share medical records instantly with doctors using secure links.
            </p>
          </div>

          <div className="backdrop-blur-lg bg-white/70 border border-white/40 rounded-xl p-6 shadow-lg">
            <h3 className="text-xl font-semibold text-blue-500">AI Assistance</h3>
            <p className="text-gray-600 mt-2">
              Understand prescriptions and treatments clearly using AI insights.
            </p>
          </div>

        </section>

        <div className="px-6 pb-32">
          <ScrollStack>

            <ScrollStackItem className="backdrop-blur-lg bg-white/70 border border-white/40 rounded-xl p-8 shadow-lg">
              <h2 className="text-2xl text-blue-500 font-bold">Manage Prescriptions</h2>

              <p className="text-gray-700 mt-2">
                Store all your prescriptions, medicines, and doctor advice in one secure digital space so you never have to search through paper files again. SimplyMed allows you to upload and organize prescriptions, track the medicines you have been prescribed, and keep a clear record of your doctor’s recommendations.
              </p>

              <button onClick={()=> router.push("/uploads")} className="mt-4 px-4 py-2 w-[40%] mx-[30%] bg-blue-500 text-white rounded hover:bg-blue-600 transition">
                Lets Store
              </button>
            </ScrollStackItem>


            <ScrollStackItem className="backdrop-blur-lg bg-white/70 border border-white/40 rounded-xl p-8 shadow-lg">
              <h2 className="text-2xl text-blue-500 font-bold">Share Medical Records</h2>

              <p className="text-gray-700 mt-2">
                Generate secure, shareable links for your medical records so doctors can quickly access your health history when needed. Instead of carrying physical prescriptions or reports, you can simply share a link that contains the relevant medical information.
              </p>

              <button onClick={()=> router.push("/uploads")} className="mt-4 px-4 py-2 w-[40%] mx-[30%] bg-blue-500 text-white rounded hover:bg-blue-600 transition">
                Lets Share
              </button>
            </ScrollStackItem>


            <ScrollStackItem className="backdrop-blur-lg bg-white/70 border border-white/40 rounded-xl p-8 shadow-lg">
              <h2 className="text-2xl text-blue-500 font-bold">AI Medical Assistant</h2>

              <p className="text-gray-700 mt-2">
                AI analyzes your prescriptions and medications to help you better understand the treatment recommended by your doctor. It highlights medicine purpose, dosage instructions, and precautions so you can manage your health confidently.
              </p>

              <button onClick={()=> router.push("/uploads")} className="mt-4 px-4 py-2 w-[40%] mx-[30%] bg-blue-500 text-white rounded hover:bg-blue-600 transition">
                Lets Begin
              </button>
            </ScrollStackItem>


            <ScrollStackItem className="backdrop-blur-lg bg-white/70 border border-white/40 rounded-xl p-8 shadow-lg">
              <h2 className="text-2xl text-blue-500 font-bold">Lifetime Access</h2>

              <p className="text-gray-700 mt-2">
                SimplyMed is committed to providing lifetime access to essential health record management tools for free. Everyone should have access to their medical information without financial barriers.
              </p>

              <button onClick={()=> router.push("/uploads")} className="mt-4 px-4 py-2 w-[40%] mx-[30%] bg-blue-500 text-white rounded hover:bg-blue-600 transition">
                Lets Get Started
              </button>
            </ScrollStackItem>

          </ScrollStack>
        </div>


        
      </div>

    </main>
  );
}