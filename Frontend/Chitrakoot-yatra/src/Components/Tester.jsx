import React from 'react'

function Tester() {
  return (
    <div className='flex flex-col items-center justify-center h-screen bg-white z-50'>
      <h1 className='text-3xl font-bold mb-4'>Tester Component</h1>
      <p className='text-lg text-gray-700'>This is a simple tester component to check layout and styles.</p>
      <button className='mt-6 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition duration-300'>
        Click Me
      </button>
      
    </div>
  )
}

export default Tester
