import { Link } from "react-router-dom";
import AuthLayout from "../components/AuthLayout";
import {useMutation, useQueryClient} from '@tanstack/react-query';
import {login} from '../libs/apis/apis';
import { useNavigate } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: login,
    onSuccess: (data) => {
      queryClient.setQueryData(['currentUser'], data);
      navigate("/");
      console.log("Login success:", data.user);
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const loginData = {
      email: formData.get("email"),
      password: formData.get("password"),
    };
    mutation.mutate(loginData);
  };

  const errors = mutation.error?.errors || {};

  return (
    <AuthLayout title="Login to Your Account">
      <form className="space-y-4" onSubmit={handleSubmit}>
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

        {mutation.error && !errors.email && !errors.password && (
          <p className="text-red-500 text-sm">
            Something went wrong. Please try again.
          </p>
        )}

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
