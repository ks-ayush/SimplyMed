import { UserButton } from "@clerk/nextjs";

export default function Dashboard() {
  return (
    <div className="flex min-h-screen justify-center text-black bg-gray-100">

      
      <aside className="md:w-64 bg-white shadow-md p-6 ">
        <h2 className="text-2xl font-bold mb-8">SimplyMed</h2>

        <nav className="flex flex-col gap-4">
          <a href="/" className="hover:text-blue-500 cursor-pointer">AI Assistant</a>
          <a href="/insights" className="hover:text-blue-500 cursor-pointer">Medical Insights</a>
          <a href="/prescriptions" className="hover:text-blue-500 cursor-pointer">Prescriptions</a>
          <a href="/" className="hover:text-blue-500 cursor-pointer">Test Analysis</a>
        </nav>
      </aside>

      <main className="flex-1 p-8">


        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl md:text-3xl font-semibold">Dashboard</h1>
          <UserButton afterSignOutUrl="/sign-in" />
        </div>

       
        <div className="flex flex-col   md:grid grid-cols-3 gap-6 mb-10">
          
          <div className="bg-white p-6 rounded-xl shadow">
            <h3 className="text-gray-500">Links Shared</h3>
            <p className="text-2xl font-bold mt-2">124</p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow">
            <h3 className="text-gray-500">Uploaded Prescriptions</h3>
            <p className="text-2xl font-bold mt-2">$3,240</p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow">
            <h3 className="text-gray-500">Tests Completed</h3>
            <p className="text-2xl font-bold mt-2">58</p>
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