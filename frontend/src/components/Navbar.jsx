import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../libs/useAuth";
import { logout } from "../libs/apis/apis";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const { data, isLoading } = useAuth();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const user = data?.user;

  const logoutMutation = useMutation({
    mutationFn: logout,
    onSuccess: () => {
      queryClient.clear();
      navigate('/login');
    },
  });

  const handleLogout = () => {
    logoutMutation.mutate();
    setIsOpen(false);
  };

  return (
    <nav className="bg-black border-b-2 border-[#2A2A2A] text-white px-6 py-4 relative shadow-lg">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className="text-2xl font-bold text-[#E43636] uppercase tracking-wider hover:text-[#C53030] transition-colors duration-200">
          UnitedFans
        </Link>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center space-x-8">
          {!user ? (
            <>
              <Link
                to="/login"
                className="text-[#F6EFD2] hover:text-[#E43636] font-semibold uppercase tracking-wide transition-colors duration-200 border-b-2 border-transparent hover:border-[#E43636] pb-1"
              >
                Login
              </Link>
              <Link
                to="/signup"
                className="bg-[#E43636] text-white border-2 border-[#E43636] px-6 py-2 font-bold uppercase tracking-wide hover:bg-[#C53030] hover:border-[#C53030] hover:shadow-lg hover:shadow-[#E43636]/50 transition-all duration-200 transform hover:scale-105"
              >
                Signup
              </Link>
            </>
          ) : (
            <>
              <Link
                to="/legends"
                className="text-[#F6EFD2] hover:text-[#E43636] font-semibold uppercase tracking-wide transition-colors duration-200 border-b-2 border-transparent hover:border-[#E43636] pb-1"
              >
                Legends
              </Link>
              <Link
                to="/myteam"
                className="text-[#F6EFD2] hover:text-[#E43636] font-semibold uppercase tracking-wide transition-colors duration-200 border-b-2 border-transparent hover:border-[#E43636] pb-1"
              >
                My Team
              </Link>

              {/* User Menu */}
              <div className="relative group">
                <button className="bg-[#1A1A1A] text-[#E2DDB4] border-2 border-[#2A2A2A] px-4 py-2 font-semibold uppercase tracking-wide hover:border-[#E43636] hover:text-[#E43636] transition-all duration-200 flex items-center space-x-2">
                  <span>{user.username}</span>
                  <span className="text-xs">▼</span>
                </button>

                {/* Dropdown */}
                <div className="absolute right-0 mt-2 w-48 bg-[#1A1A1A] border-2 border-[#2A2A2A] shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                  <Link
                    to="/myprofile"
                    className="block px-4 py-3 text-[#F6EFD2] hover:bg-[#2A2A2A] hover:text-[#E43636] font-medium uppercase tracking-wide transition-colors duration-200"
                  >
                    Profile
                  </Link>
                  <button
                    onClick={handleLogout}
                    disabled={logoutMutation.isLoading}
                    className="w-full text-left px-4 py-3 text-[#E43636] hover:bg-[#E43636] hover:text-white font-medium uppercase tracking-wide transition-all duration-200 border-t border-[#2A2A2A]"
                  >
                    {logoutMutation.isLoading ? 'Logging out...' : 'Logout'}
                  </button>
                </div>
              </div>
            </>
          )}
        </div>

        {/* Mobile menu button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden text-[#F6EFD2] hover:text-[#E43636] focus:outline-none transition-colors duration-200"
        >
          <div className="w-6 h-6 flex flex-col justify-center items-center space-y-1">
            <span className={`block w-5 h-0.5 bg-current transition-transform duration-200 ${isOpen ? 'rotate-45 translate-y-1.5' : ''}`}></span>
            <span className={`block w-5 h-0.5 bg-current transition-opacity duration-200 ${isOpen ? 'opacity-0' : ''}`}></span>
            <span className={`block w-5 h-0.5 bg-current transition-transform duration-200 ${isOpen ? '-rotate-45 -translate-y-1.5' : ''}`}></span>
          </div>
        </button>
      </div>

      {/* Mobile Dropdown */}
      {isOpen && (
        <div className="absolute top-full left-0 w-full bg-[#1A1A1A] border-t-2 border-[#2A2A2A] z-50 md:hidden shadow-xl">
          <div className="flex flex-col space-y-0">
            {!user ? (
              <>
                <Link
                  to="/login"
                  className="px-6 py-4 text-[#F6EFD2] hover:bg-[#2A2A2A] hover:text-[#E43636] font-semibold uppercase tracking-wide transition-colors duration-200 border-b border-[#2A2A2A]"
                  onClick={() => setIsOpen(false)}
                >
                  Login
                </Link>
                <Link
                  to="/signup"
                  className="px-6 py-4 bg-[#E43636] text-white hover:bg-[#C53030] font-bold uppercase tracking-wide transition-colors duration-200"
                  onClick={() => setIsOpen(false)}
                >
                  Signup
                </Link>
              </>
            ) : (
              <>
                <Link
                  to="/legends"
                  className="px-6 py-4 text-[#F6EFD2] hover:bg-[#2A2A2A] hover:text-[#E43636] font-semibold uppercase tracking-wide transition-colors duration-200 border-b border-[#2A2A2A]"
                  onClick={() => setIsOpen(false)}
                >
                  Legends
                </Link>
                <Link
                  to="/myteam"
                  className="px-6 py-4 text-[#F6EFD2] hover:bg-[#2A2A2A] hover:text-[#E43636] font-semibold uppercase tracking-wide transition-colors duration-200 border-b border-[#2A2A2A]"
                  onClick={() => setIsOpen(false)}
                >
                  My Team
                </Link>
                <Link
                  to="/myprofile"
                  className="px-6 py-4 text-[#F6EFD2] hover:bg-[#2A2A2A] hover:text-[#E43636] font-semibold uppercase tracking-wide transition-colors duration-200 border-b border-[#2A2A2A]"
                  onClick={() => setIsOpen(false)}
                >
                  Profile
                </Link>
                <button
                  onClick={handleLogout}
                  disabled={logoutMutation.isLoading}
                  className="w-full text-left px-6 py-4 text-[#E43636] hover:bg-[#E43636] hover:text-white font-semibold uppercase tracking-wide transition-all duration-200"
                >
                  {logoutMutation.isLoading ? 'Logging out...' : 'Logout'}
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}
