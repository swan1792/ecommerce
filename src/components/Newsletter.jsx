import React from 'react'

const Newsletter = () => {
    const handleSubmit = (e) => {
        e.preventDefault();
    }
  return (
    <div className="bg-gray-50 py-16 px-6 flex flex-col items-center text-center">
      {/* Heading */}
      <p className="text-2xl sm:text-3xl text-gray-800 mb-6">
        Subscribe now & get <span className="text-blue-800">20% off</span>
      </p>

      {/* Form */}
      <form className="flex flex-col sm:flex-row items-center w-full max-w-md gap-4">
        <input
          type="email"
          placeholder="Enter your email"
          className="w-full flex-1 px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          onClick={(e)=>handleSubmit(e)}
          type="submit"
          className="px-6 py-3 bg-gray-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition duration-300 w-full sm:w-auto"
        >
          Subscribe
        </button>
      </form>
    </div>
  )
}

export default Newsletter
