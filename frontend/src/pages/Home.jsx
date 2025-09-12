import React from 'react'
import { Link } from 'react-router-dom'
import bg from '../assets/bg.jpg' // Ensure you have a background image in this path

const Home = () => {
  return (
    <section
      className="relative h-screen flex items-center justify-center text-center text-white"
      style={{ backgroundImage: `url(${bg})`, backgroundSize: 'cover', backgroundPosition: 'center' }}
    >
      {/* Overlay for dark effect */}
      <div className="absolute inset-0 bg-black/70"></div>

      {/* Content */}
      <div className="relative z-10 max-w-2xl px-4">
        <h1 className="font-tages text-4xl md:text-6xl font-bold mb-4">
          Pick Your Greatest Red
        </h1>
        <p className="text-lg md:text-xl mb-8">
          Select the greatest team from a pool of legends in red.
        </p>

        <div className="flex justify-center gap-4">
          <Link
            to="/signup"
            className="px-6 py-3 bg-red-600 hover:bg-red-700 rounded-lg text-lg font-medium"
          >
            Signup
          </Link>
          <Link
            to="/legends"
            className="px-6 py-3 border border-white hover:bg-white hover:text-black rounded-lg text-lg font-medium"
          >
            Learn More
          </Link>
        </div>
      </div>
    </section>
  )
}

export default Home