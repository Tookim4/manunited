import { Link } from "react-router-dom";
import AuthLayout from "../components/AuthLayout";

export default function Login() {
  return (
    <AuthLayout title="Login to Your Account">
      <form className="space-y-4">
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

        {/* Forgot password link */}
        <div className="flex justify-end">
          <Link
            to="/forgot-password"
            className="text-sm text-red-500 hover:underline"
          >
            Forgot password?
          </Link>
        </div>

        <button
          type="submit"
          className="w-full py-2 bg-red-600 hover:bg-red-700 rounded-lg font-medium"
        >
          Login
        </button>
      </form>

      <p className="mt-4 text-gray-400">
        Don’t have an account?{" "}
        <Link to="/signup" className="text-red-500 hover:underline">
          Signup
        </Link>
      </p>
    </AuthLayout>
  );
}
