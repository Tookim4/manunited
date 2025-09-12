import { useState } from "react";
import { Link } from "react-router-dom";

export default function Navbar({ isLoggedIn }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-black text-white px-6 py-4 relative">
      <div className="flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className="text-2xl font-bold text-red-600">
          UnitedFans
        </Link>

        {/* Desktop Links */}
        <div className="hidden md:flex space-x-6">
          {!isLoggedIn ? (
            <>
              <Link to="/login" className="hover:text-red-500">
                Login
              </Link>
              <Link to="/signup" className="hover:text-red-500">
                Signup
              </Link>
            </>
          ) : (
            <>
              <Link to="/legends" className="hover:text-red-500">
                Legends
              </Link>
              <Link to="/my-team" className="hover:text-red-500">
                My Team
              </Link>
              <Link to="/profile" className="bg-red-600 px-3 py-1 rounded-lg hover:bg-red-700">
                Profile
              </Link>
            </>
          )}
        </div>

        {/* Mobile menu button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden focus:outline-none"
        >
          {isOpen ? "✖" : "☰"}
        </button>
      </div>

      {/* Mobile Dropdown */}
      {isOpen && (
        <div className="absolute top-full left-0 w-full bg-black z-50 md:hidden flex flex-col space-y-4 px-6 py-4">
          {!isLoggedIn ? (
            <>
              <Link to="/login" className="hover:text-red-500" onClick={() => setIsOpen(false)}>
                Login
              </Link>
              <Link to="/signup" className="hover:text-red-500" onClick={() => setIsOpen(false)}>
                Signup
              </Link>
            </>
          ) : (
            <>
              <Link to="/legends" className="hover:text-red-500" onClick={() => setIsOpen(false)}>
                Legends
              </Link>
              <Link to="/my-team" className="hover:text-red-500" onClick={() => setIsOpen(false)}>
                My Team
              </Link>
              <Link to="/profile" className="bg-red-600 px-3 py-1 rounded-lg hover:bg-red-700" onClick={() => setIsOpen(false)}>
                Profile
              </Link>
            </>
          )}
        </div>
      )}
    </nav>
  );
}
