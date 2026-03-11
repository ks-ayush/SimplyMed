import React from 'react'

const Navbar = () => {
  return (
    
      <nav className="bg-blue-400 border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center gap-8 h-14">
          
            <a href="/uploads" className="text-white text-xl font-serif hover:text-gray-200">
              Uploads
            </a>
            <a href="/" className="text-white font-bold text-3xl hover:text-gray-200">
              SimplyMed
            </a>
            <a href="/sign-in" className="text-white text-xl font-serif hover:text-gray-200">
              Sign In
            </a>
          </div>
              
          
        </div>
      </nav>
    
  )
}

export default Navbar
