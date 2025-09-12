import { Link } from "react-router-dom";
import AuthLayout from "../components/AuthLayout";

export default function Signup() {
  return (
    <AuthLayout title="Create Your Account">
      <form className="space-y-4">
        <input
          type="text"
          placeholder="Username"
          className="w-full px-4 py-2 rounded-lg bg-gray-800 text-white focus:ring-2 focus:ring-red-600 outline-none"
        />
        <input
          type="email"
          placeholder="Email"
          className="w-full px-4 py-2 rounded-lg bg-gray-800 text-white focus:ring-2 focus:ring-red-600 outline-none"
        />
        <input
          type="password"
          placeholder="Password"
          className="w-full px-4 py-2 rounded-lg bg-gray-800 text-white focus:ring-2 focus:ring-red-600 outline-none"
        />
        <button
          type="submit"
          className="w-full py-2 bg-red-600 hover:bg-red-700 rounded-lg font-medium"
        >
          Signup
        </button>
      </form>

      <p className="mt-4 text-gray-400">
        Already have an account?{" "}
        <Link to="/login" className="text-red-500 hover:underline">
          Login
        </Link>
      </p>
    </AuthLayout>
  );
}
