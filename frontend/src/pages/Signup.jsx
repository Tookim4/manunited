import { Link } from "react-router-dom";
import AuthLayout from "../components/AuthLayout";
import {useMutation} from '@tanstack/react-query';
import {signup} from '../libs/apis/apis';
import { useNavigate } from "react-router-dom";

export default function Signup() {
  const navigate = useNavigate();

  const mutation = useMutation({
    mutationFn: signup,
    onSuccess: (data) => {
    navigate("/login");
      console.log("Signup success:", data.user);
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const signupData = {
      username: formData.get("username"),
      email: formData.get("email"),
      password: formData.get("password"),
    };
    mutation.mutate(signupData);
  };

  const errors = mutation.error?.errors || {};

  return (
    <AuthLayout title="Create Your Account">
      <form className="space-y-4" onSubmit={handleSubmit}>
        <input
          type="text"
          name="username"
          placeholder="Username"
          className="w-full px-4 py-2 rounded-lg bg-gray-800 text-white focus:ring-2 focus:ring-red-600 outline-none"
        />
        {errors.username && <p className="text-red-500 text-sm">{errors.username}</p>}
        <input
          type="email"
          name="email"
          placeholder="Email"
          className="w-full px-4 py-2 rounded-lg bg-gray-800 text-white focus:ring-2 focus:ring-red-600 outline-none"
        />
        {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
        <input
          type="password"
          name="password"
          placeholder="Password"
          className="w-full px-4 py-2 rounded-lg bg-gray-800 text-white focus:ring-2 focus:ring-red-600 outline-none"
        />
        {errors.password && <p className="text-red-500 text-sm">{errors.password}</p>}
        <button
          type="submit"
          className="w-full py-2 bg-red-600 hover:bg-red-700 rounded-lg font-medium"
        >
          Signup
        </button>

        {mutation.error && !errors.email && !errors.password && (
          <p className="text-red-500 text-sm">
            Something went wrong. Please try again.
          </p>
        )}

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
