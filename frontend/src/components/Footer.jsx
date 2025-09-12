import { FaFacebook} from "@react-icons/all-files/fa/FaFacebook";
import { FaTwitter} from "@react-icons/all-files/fa/FaTwitter";
import { FaInstagram} from "@react-icons/all-files/fa/FaInstagram";

export default function Footer() {
  return (
    <footer className="bg-black text-gray-400 border-t border-red-600">
      <div className="max-w-7xl mx-auto px-6 py-12 grid gap-8 md:grid-cols-3">
        
        {/* Brand */}
        <div>
          <h2 className="text-2xl font-heading text-red-600">MU Legends</h2>
          <p className="mt-3 text-sm">
            Celebrating the icons who shaped Manchester United’s history.
          </p>
        </div>

        {/* Navigation */}
        <div className="flex flex-col space-y-2 text-sm">
          <a href="/" className="hover:text-red-500 transition">Home</a>
          <a href="/legends" className="hover:text-red-500 transition">Legends</a>
          <a href="/team" className="hover:text-red-500 transition">My Team</a>
          <a href="/profile" className="hover:text-red-500 transition">Profile</a>
        </div>

        {/* Socials */}
        <div className="flex flex-col items-start md:items-end space-y-4">
          <div className="flex space-x-4 text-xl">
            <a href="#" className="hover:text-red-500 transition"><FaFacebook /></a>
            <a href="#" className="hover:text-red-500 transition"><FaTwitter /></a>
            <a href="#" className="hover:text-red-500 transition"><FaInstagram /></a>
          </div>
          <p className="text-xs">&copy; {new Date().getFullYear()} MU Legends. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
