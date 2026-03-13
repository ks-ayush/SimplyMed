import { UserButton } from "@clerk/nextjs";

export default function Dashboard() {
  return (
    <div className="flex min-h-screen justify-center text-black bg-gray-100">

      {/* Sidebar */}
      <aside className="md:w-64 bg-white shadow-md p-6 ">
        <h2 className="text-2xl font-bold mb-8">MyApp</h2>

        <nav className="flex flex-col gap-4">
          <a className="hover:text-blue-500 cursor-pointer">Dashboard</a>
          <a className="hover:text-blue-500 cursor-pointer">Orders</a>
          <a className="hover:text-blue-500 cursor-pointer">Settings</a>
          <a className="hover:text-blue-500 cursor-pointer">Analytics</a>
        </nav>
      </aside>

      <main className="flex-1 p-8">


        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl md:text-3xl font-semibold">Dashboard</h1>
          <UserButton afterSignOutUrl="/sign-in" />
        </div>

        {/* Stats */}
        <div className="flex flex-col   md:grid grid-cols-3 gap-6 mb-10">
          
          <div className="bg-white p-6 rounded-xl shadow">
            <h3 className="text-gray-500">Total Orders</h3>
            <p className="text-2xl font-bold mt-2">124</p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow">
            <h3 className="text-gray-500">Revenue</h3>
            <p className="text-2xl font-bold mt-2">$3,240</p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow">
            <h3 className="text-gray-500">Users</h3>
            <p className="text-2xl font-bold mt-2">58</p>
          </div>

        </div>

        {/* Content Area */}
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