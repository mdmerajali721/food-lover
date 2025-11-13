import React from "react";
import { Link } from "react-router";
import errorImg from "../assets/erroe.png";

const ErrorPage = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 px-6 text-center">
      {/* Error Image */}
      <div className="w-80 max-w-full mb-6 relative">
        <img
          src={errorImg}
          alt="404 Error"
          className="w-full animate-bounce-slow"
        />
      </div>

      {/* Error Text */}
      <h2 className="text-2xl md:text-3xl font-semibold mb-2 text-gray-800">
        Oops! Page Not Found
      </h2>
      <p className="text-gray-700 mb-6 max-w-md mx-auto">
        The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
      </p>

      {/* Back to Home Button */}
      <Link
        to="/"
        className="inline-block bg-amber-500 text-white px-8 py-3 rounded-full shadow-lg hover:bg-amber-600 transition-all transform hover:scale-105"
      >
        Back to Home
      </Link>
    </div>
  );
};

export default ErrorPage;
