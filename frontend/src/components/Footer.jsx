import { FaFacebook } from "@react-icons/all-files/fa/FaFacebook";
import { FaTwitter } from "@react-icons/all-files/fa/FaTwitter";
import { FaInstagram } from "@react-icons/all-files/fa/FaInstagram";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="bg-black border-t-2 border-[#2A2A2A] relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-[#E43636]/10 to-transparent"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 py-16">

        {/* Main Footer Content */}
        <div className="grid gap-12 md:grid-cols-4 mb-12">

          {/* Brand Section */}
          <div className="md:col-span-2">
            <div className="mb-6">
              <h2 className="text-3xl font-black text-[#E43636] uppercase tracking-wider mb-2">
                United Legends Library
              </h2>
              <div className="w-16 h-1 bg-[#E43636]"></div>
            </div>
            <p className="text-[#F6EFD2] text-lg leading-relaxed max-w-md">
              Preserving the legacy of Manchester United's greatest players.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-bold uppercase tracking-wider text-lg mb-6">
              Explore
            </h3>
            <nav className="space-y-3">
              <Link
                to="/"
                className="block text-[#E2DDB4] hover:text-[#E43636] font-medium uppercase tracking-wide text-sm transition-colors duration-200 hover:translate-x-2 transform"
              >
                Home
              </Link>
              <Link
                to="/legends"
                className="block text-[#E2DDB4] hover:text-[#E43636] font-medium uppercase tracking-wide text-sm transition-colors duration-200 hover:translate-x-2 transform"
              >
                Legends
              </Link>
              <Link
                to="/profile"
                className="block text-[#E2DDB4] hover:text-[#E43636] font-medium uppercase tracking-wide text-sm transition-colors duration-200 hover:translate-x-2 transform"
              >
                Profile
              </Link>
            </nav>
          </div>

          {/* Connect Section */}
          <div>
            <h3 className="text-white font-bold uppercase tracking-wider text-lg mb-6">
              Connect
            </h3>
            <div className="space-y-4">
              <div className="flex space-x-4">
                <a
                  href="#"
                  className="w-12 h-12 bg-[#1A1A1A] border border-[#2A2A2A] flex items-center justify-center text-[#E2DDB4] hover:text-[#E43636] hover:border-[#E43636] transition-all duration-200 hover:scale-110"
                >
                  <FaFacebook className="text-lg" />
                </a>
                <a
                  href="#"
                  className="w-12 h-12 bg-[#1A1A1A] border border-[#2A2A2A] flex items-center justify-center text-[#E2DDB4] hover:text-[#E43636] hover:border-[#E43636] transition-all duration-200 hover:scale-110"
                >
                  <FaTwitter className="text-lg" />
                </a>
                <a
                  href="#"
                  className="w-12 h-12 bg-[#1A1A1A] border border-[#2A2A2A] flex items-center justify-center text-[#E2DDB4] hover:text-[#E43636] hover:border-[#E43636] transition-all duration-200 hover:scale-110"
                >
                  <FaInstagram className="text-lg" />
                </a>
              </div>

              <div className="pt-4 border-t border-[#2A2A2A]">
                <p className="text-[#E2DDB4] text-sm font-medium">
                  Join the community of United fans worldwide
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="pt-8 border-t border-[#2A2A2A]">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="flex items-center space-x-6 text-sm text-[#E2DDB4]">
              <span>⚽ Manchester United FC</span>
              <span className="hidden md:block">|</span>
              <span>Est. 1878</span>
            </div>

            <div className="text-[#E2DDB4] text-sm">
              &copy; {new Date().getFullYear()} United Legends Library. All rights reserved.
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
