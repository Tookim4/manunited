import React from 'react'
import { Link } from 'react-router-dom'
import bg from '../assets/bg.jpg'
import { useAuth } from '../libs/useAuth'

const Home = () => {
  const { data, isLoading } = useAuth();
  const user = data?.user;

  if (isLoading) {
    return <div className="text-white flex justify-center items-center min-h-screen">Loading...</div>;
  }

  return (
    <div className="bg-black">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        
        {/* Background Image */}
        <div
          className="absolute inset-0 bg-cover bg-center scale-105 brightness-[0.6]"
          style={{ backgroundImage: `url(${bg})` }}
        />

        {/* Cinematic Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/60 to-black/90"></div>

        {/* Main Content */}
        <div className="relative z-10 text-center max-w-5xl mx-auto px-6">

          {/* Heading */}
          <div className="mb-8">
            <h1 className="text-6xl md:text-8xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-[#E43636] via-red-600 to-[#ff4d4d] drop-shadow-2xl tracking-wide leading-tight">
              United
            </h1>
            <h2 className="text-4xl md:text-6xl font-black text-white uppercase tracking-[0.15em] drop-shadow-lg">
              Legends Library
            </h2>
          </div>

          {/* Subtitle */}
          <div className="mb-12">
            <p className="text-lg md:text-2xl text-[#F6EFD2] font-light max-w-3xl mx-auto leading-relaxed tracking-wide">
              Relive the glory. Celebrate the icons. Explore the stories of Manchester United’s greatest players.
            </p>
          </div>

          {/* Stats */}
          <div className="flex justify-center gap-10 md:gap-16 mb-16">
            {[
              { number: "50+", label: "Legendary Players" },
              { number: "20", label: "League Titles" },
              { number: "3", label: "Champions League" },
            ].map((stat, i) => (
              <div key={i} className="group">
                <div className="text-4xl md:text-5xl font-extrabold text-[#E43636] group-hover:scale-110 transition-transform duration-300">
                  {stat.number}
                </div>
                <div className="text-sm text-[#E2DDB4] uppercase tracking-widest font-semibold group-hover:text-white transition-colors">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row justify-center gap-6">
            {!user ? (
              <Link
                to="/signup"
                className="relative bg-[#E43636] text-white px-12 py-5 font-bold text-lg uppercase rounded-xl tracking-wider overflow-hidden shadow-lg shadow-[#E43636]/30 transition-all duration-500 hover:scale-110 hover:shadow-[#E43636]/70"
              >
                <span className="relative z-10">Join the Library</span>
                <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
              </Link>
            ) : (
              <Link
                to="/myteam"
                className="relative bg-[#E43636] text-white px-12 py-5 font-bold text-lg uppercase rounded-xl tracking-wider overflow-hidden shadow-lg shadow-[#E43636]/30 transition-all duration-500 hover:scale-110 hover:shadow-[#E43636]/70"
              >
                <span className="relative z-10">My Collection</span>
                <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
              </Link>
            )}

            <Link
              to="/legends"
              className="relative border-2 border-white text-white px-12 py-5 font-bold text-lg uppercase rounded-xl tracking-wider overflow-hidden transition-all duration-500 hover:bg-white hover:text-black hover:scale-110 hover:shadow-2xl hover:shadow-white/40"
            >
              <span className="relative z-10">Browse Legends</span>
              <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent -skew-x-12 translate-x-full group-hover:-translate-x-full transition-transform duration-700"></div>
            </Link>
          </div>

          {/* Description */}
          <div className="mt-16 max-w-4xl mx-auto">
            <p className="text-[#E2DDB4] text-lg md:text-xl leading-relaxed font-light tracking-wide">
              From <span className="text-white font-semibold">iconic strikers</span> to <span className="text-white font-semibold">defensive legends</span>, 
              discover the players who built a dynasty and defined an era of football.
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Home
