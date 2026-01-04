import React, { useState } from "react";
import { Link, useNavigate } from "react-router";
import { useAuth } from "../../context/AuthContext";
import toast from "react-hot-toast";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";

const Register = () => {
  const { signup, loginWithGoogle } = useAuth();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    photoURL: "",
    password: "",
    confirmPassword: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  // Password Validation
  const validatePassword = (pwd) => {
    const hasUpper = /[A-Z]/.test(pwd);
    const hasLower = /[a-z]/.test(pwd);
    const hasLength = pwd.length >= 6;

    if (!hasUpper) toast.error("Password must contain an uppercase letter");
    if (!hasLower) toast.error("Password must contain a lowercase letter");
    if (!hasLength) toast.error("Password must be at least 6 characters long");

    return hasUpper && hasLower && hasLength;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    toast.dismiss();

    if (form.password !== form.confirmPassword) {
      return toast.error("Passwords do not match!");
    }

    if (!validatePassword(form.password)) return;

    setLoading(true);
    try {
      await signup(form.name, form.email, form.password, form.photoURL);
      navigate("/");
    } catch (err) {
      toast.error(err.message || "Registration failed!");
    } finally {
      setLoading(false);
    }
  };

  const handleGoogle = async () => {
    setLoading(true);
    try {
      await loginWithGoogle();
      navigate("/");
    } catch (err) {
      toast.error(err.message || "Google sign-in failed!");
    } finally {
      setLoading(false);
    }
  };

  const buttonStyle =
    "mt-auto w-full py-3 cursor-pointer rounded font-bold text-white bg-gradient-to-r from-green-500 to-emerald-600 hover:from-emerald-600 hover:to-green-500 shadow-md transition-all duration-300 flex justify-center items-center gap-2";
  const textStyle =
    "text-3xl font-bold mb-6 text-center max-w-xs mx-auto border-b-2 border-green-500 bg-gradient-to-r from-green-500 to-emerald-600 bg-clip-text text-transparent";      

  return (
    <div className="flex justify-center items-start px-4 py-10">
      <title>Register - Food Lovers</title>
      <div className="w-full max-w-md bg-base-100 rounded shadow-lg p-8">
        <h1 className={textStyle}>Register to Food Lovers</h1>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          {/* Name */}
          <input
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder="Full Name"
            className="w-full bg-base-100 border border-gray-200 rounded-md px-3 py-3 text-sm focus:outline-none focus:ring-1 focus:ring-green-600"
            required
          />

          {/* Email */}
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            placeholder="Email Address"
            className="w-full bg-base-100 border border-gray-200 rounded-md px-3 py-3 text-sm focus:outline-none focus:ring-1 focus:ring-green-600"
            required
          />

          {/* Photo URL */}
          <input
            type="text"
            name="photoURL"
            value={form.photoURL}
            onChange={handleChange}
            placeholder="Photo URL (optional)"
            className="w-full bg-base-100 border border-gray-200 rounded-md px-3 py-3 text-sm focus:outline-none focus:ring-1 focus:ring-green-600"
          />

          {/* Password */}
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              value={form.password}
              onChange={handleChange}
              placeholder="Password"
              className="w-full bg-base-100 border border-gray-200 rounded-md px-3 py-3 text-sm focus:outline-none focus:ring-1 focus:ring-green-600"
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute inset-y-0 right-3 flex items-center text-gray-500"
            >
              {showPassword ? <FaEye /> : <FaEyeSlash />}
            </button>
          </div>

          {/* Confirm Password */}
          <div className="relative">
            <input
              type={showConfirm ? "text" : "password"}
              name="confirmPassword"
              value={form.confirmPassword}
              onChange={handleChange}
              placeholder="Confirm Password"
              className="w-full bg-base-100 border border-gray-200 rounded-md px-3 py-3 text-sm focus:outline-none focus:ring-1 focus:ring-green-600"
              required
            />
            <button
              type="button"
              onClick={() => setShowConfirm(!showConfirm)}
              className="absolute inset-y-0 right-3 flex items-center text-gray-500"
            >
              {showConfirm ? <FaEye /> : <FaEyeSlash />}
            </button>
          </div>

          {/* Submit */}
          <button type="submit" disabled={loading} className={buttonStyle}>
            {loading ? "Registering..." : "Register"}
          </button>
        </form>

        {/* Divider */}
        <div className="flex items-center my-5">
          <div className="flex-1 border-t border-gray-300"></div>
          <span className="px-3 text-gray-400 text-sm font-medium">Or</span>
          <div className="flex-1 border-t border-gray-300"></div>
        </div>

        {/* Google */}
        <button
          onClick={handleGoogle}
          disabled={loading}
          className="flex items-center justify-center gap-1 w-full border border-gray-200 rounded-md py-3 hover:shadow-md transition"
        >
          <FcGoogle size={18} />
          <span className="text-sm font-medium">Continue with Google</span>
        </button>

        <p className="mt-6 text-sm text-center text-gray-600">
          Already have an account?{" "}
          <Link
            to="/login"
            className="text-green-500 font-semibold hover:underline"
          >
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
