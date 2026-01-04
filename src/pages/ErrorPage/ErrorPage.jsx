import React from "react";
import { Link } from "react-router";
import errorImg from "../../assets/erroe.png";


const buttonStyle =
  "mx-auto px-4 py-2 cursor-pointer rounded font-bold text-white bg-gradient-to-r from-green-500 to-emerald-600 hover:from-emerald-600 hover:to-green-500 shadow-md transition-all duration-300 flex justify-center items-center gap-2";

const ErrorPage = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 px-6 text-center">
      {/* Error Image */}
      <div className="w-80 max-w-full mb-4 relative">
        <img
          src={errorImg}
          alt="404 Error"
          className="w-full animate-bounce-slow"
        />
      </div>

      {/* Error Text */}
      <h2 className="text-2xl font-extrabold mb-2 text-red-500">
        Oops! Page Not Found
      </h2>
      <p className="text-gray-700 text-sm mb-6 max-w-md mx-auto">
        The page you are looking for might have been removed, had its name
        changed, or is temporarily unavailable.
      </p>

      {/* Back to Home Button */}
      <Link to="/" className={buttonStyle}>
        Back to Home
      </Link>
    </div>
  );
};

export default ErrorPage;
