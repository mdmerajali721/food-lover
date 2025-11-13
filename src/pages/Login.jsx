import React, { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router";
import { useAuth } from "../context/AuthContext";
import toast from "react-hot-toast";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";

const Login = () => {
  const { login, loginWithGoogle } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await login(email, password);
      toast.dismiss();
      toast.success("Login successful!");
      navigate(from, { replace: true });
    } catch (err) {
      toast.dismiss();
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    setLoading(true);
    try {
      await loginWithGoogle();
      toast.dismiss();
      toast.success("Login successful!");
      navigate(from, { replace: true });
    } catch (err) {
      toast.dismiss();
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-start px-4 py-20">
      <title>Login - Food Lovers</title>
      <div className="w-full max-w-md bg-white rounded-xl shadow-lg p-8">
        <h1 className="text-2xl font-bold text-center text-green-600 mb-6">Log In</h1>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            type="email"
            placeholder="Email"
            value={email}
            name="email"
            onChange={(e) => setEmail(e.target.value)}
            className="w-full bg-[#FAFAFA] border border-gray-200 rounded-md px-3 py-3 text-sm focus:outline-none focus:ring-1 focus:ring-green-600"
            required
          />

          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-[#FAFAFA] border border-gray-200 rounded-md px-3 py-3 text-sm focus:outline-none focus:ring-1 focus:ring-green-600"
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute inset-y-0 right-3 flex items-center text-gray-500 focus:outline-none"
            >
              {showPassword ? <FaEye /> : <FaEyeSlash />}
            </button>
          </div>

          <div className="flex justify-end text-sm mb-2">
            <button
              type="button"
              onClick={() => navigate("/forgot-password", { state: { email } })}
              className="text-green-600 hover:underline"
            >
              Forgot Password?
            </button>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full cursor-pointer text-white py-2 rounded-md bg-green-600 hover:bg-green-700 transition font-medium disabled:opacity-50"
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        <div className="flex items-center my-6">
          <div className="flex-1 border-t border-gray-300"></div>
          <span className="px-3 text-gray-400 text-sm font-medium">Or</span>
          <div className="flex-1 border-t border-gray-300"></div>
        </div>

        <button
          onClick={handleGoogleLogin}
          disabled={loading}
          className="flex items-center cursor-pointer justify-center gap-2 w-full border border-gray-200 rounded-md py-3 hover:shadow-sm transition"
        >
          <FcGoogle size={18} />
          <span className="text-sm font-medium">Sign in with Google</span>
        </button>

        <p className="mt-6 text-sm text-center text-gray-600">
          Don’t have an account?{" "}
          <Link to="/register" className="text-blue-500 font-semibold hover:underline">
            Register
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
