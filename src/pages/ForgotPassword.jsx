import React, { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { useLocation, Link } from "react-router";
import toast from "react-hot-toast";
import { FaArrowLeft } from "react-icons/fa6";

const ForgotPassword = () => {
  const { resetPassword } = useAuth();
  const location = useLocation();
  const [email, setEmail] = useState("");

  useEffect(() => {
    if (location.state?.email) setEmail(location.state.email);
  }, [location.state]);

  const submit = async (e) => {
    e.preventDefault();
    if (!email) {
      toast.error("Please enter your email");
      return;
    }
    try {
      await resetPassword(email);
      toast.success("Password reset email sent! Please check your inbox");
      setEmail("");
    } catch (err) {
      toast.error(err.message);
    }
  };

  return (
    <div className="flex justify-center items-start px-4 py-6">
      <title>Forgot Password - Food Lovers</title>
      <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-xl">
        <h2 className="text-2xl font-bold text-center text-green-600 mb-6">
          Forgot Password
        </h2>
        <form onSubmit={submit} className="space-y-4">
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            name="email"
            type="email"
            placeholder="Enter your email"
            className="w-full bg-[#FAFAFA] text-sm border border-gray-200 p-3 rounded-md focus:outline-none focus:ring-1 focus:ring-green-600"
            required
          />
          <button
            type="submit"
            className="w-full bg-green-600 text-white py-2 rounded-md hover:bg-green-700 transition"
          >
            Reset Password
          </button>
        </form>
        <div className="mt-5">
          <Link to="/login" className="text-blue-500 text-sm flex items-center justify-center gap-2 font-medium hover:underline">
            <FaArrowLeft />Back to Login
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
