import React from 'react'

const Footer = () => {
  return (
    <main className='bg-black text-white'>
        <div className='pt-12'>
            <h2 className='text-2xl text-blue-400 font-bold text-center py-4'>Made with ❤️ by SimplyMed Team</h2>
            <p className='text-gray-100 text-center mb-4'>© 2025 SimplyMed. All rights reserved.</p>
            <div className='flex justify-center gap-6 mb-8'>
                <a href="#" className='text-gray-400 hover:text-gray-200 transition'>Privacy Policy</a>
                <a href="#" className='text-gray-400 hover:text-gray-200 transition'>Terms of Service</a>
                <a href="#" className='text-gray-400 hover:text-gray-200 transition'>Contact Us</a>
            </div>
        </div>

    </main>
  )
}

export default Footer
