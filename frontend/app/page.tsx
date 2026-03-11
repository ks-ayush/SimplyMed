"use client";
import Image from "next/image";
import FeatureCarousel from "./components/Slide";
// import ScrollStack, { ScrollStackItem } from "./components/scroll";
import ScrollStack, { ScrollStackItem } from "./components/scroll";
export default function Home() {
  return (
    <main className="bg-gray-100 min-h-screen">


      <div className="flex ">
        <FeatureCarousel />
      </div>

      <div>
        <ScrollStack>

          <ScrollStackItem>
            <h2 className="text-2xl text-blue-400 font-bold">Manage Prescriptions</h2>
            <p className="text-gray-100 mt-2">
              Store all your prescriptions, medicines, and doctor advice in one secure digital space so you never have to search through paper files again. SimplyMed allows you to upload and organize prescriptions, track the medicines you have been prescribed, and keep a clear record of your doctor’s recommendations. This helps you easily review past treatments whenever needed. Having everything in one place also makes it simpler to understand your medical history and manage ongoing treatments. It ensures that important health information is always accessible whenever you visit a doctor or need to check your previous prescriptions.
            </p>
            <button className="mt-4 px-4 py-2 w-[40%] mx-[30%] bg-blue-400 text-white rounded hover:bg-blue-500 transition">Lets Store</button>
          </ScrollStackItem>

          <ScrollStackItem>
            <h2 className="text-2xl text-blue-400 font-bold">Share Medical Records</h2>
            <p className="text-gray-100 mt-2">
              Generate secure, shareable links for your medical records so doctors can quickly access your health history when needed. Instead of carrying physical prescriptions or reports, you can simply share a link that contains the relevant medical information. This makes consultations faster and more efficient, especially when visiting a new doctor. The shared data remains organized and easy to review, helping doctors understand your past treatments and medications. It also ensures that important medical details can be accessed anytime while maintaining privacy and control over your records.
            </p>
            <button className="mt-4 px-4 py-2 w-[40%] mx-[30%] bg-blue-400 text-white rounded hover:bg-blue-500 transition">Lets Share</button>
          </ScrollStackItem>

          <ScrollStackItem>
            <h2 className="text-2xl text-blue-400 font-bold">AI Medical Assistant</h2>
            <p className="text-gray-100 mt-2">
              AI analyzes your prescriptions and medications to help you better understand the treatment recommended by your doctor. It can highlight important details such as the purpose of each medicine, dosage instructions, and possible precautions to consider. This makes complex medical information easier to interpret, especially when prescriptions contain unfamiliar terms. The AI assistance acts as a supportive guide, helping you stay informed about your medications and treatment plan. By providing clear insights, it enables you to manage your health more confidently and responsibly.
            </p>
            <button className="mt-4 px-4 py-2 w-[40%] mx-[30%] bg-blue-400 text-white rounded hover:bg-blue-500 transition">Lets Begin</button>
          </ScrollStackItem>

          <ScrollStackItem>
            <h2 className="text-2xl text-blue-400 font-bold">Lifetime access for free</h2>
            <p className="text-gray-100 mt-2">
              We are committed to providing lifetime access to our platform for free. Our mission is to empower individuals to take control of their health without any financial barriers. By offering our services at no cost, we aim to ensure that everyone can benefit from the convenience and organization that SimplyMed provides. Whether you need to store prescriptions, share medical records, or get AI insights, you can do so without worrying about subscription fees or hidden costs. We believe that access to essential health management tools should be available to all, and we are dedicated to making that a reality.
            </p>
            <button className="mt-4 px-4 py-2 w-[40%] mx-[30%] bg-blue-400 text-white rounded hover:bg-blue-500 transition">Lets Get Started</button>
          </ScrollStackItem>

        </ScrollStack>
      </div>



      


    </main>
  );
}
