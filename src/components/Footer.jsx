import React from "react";
import { Link } from "react-router";
import { AiFillFacebook, AiFillInstagram } from "react-icons/ai";
import { FaSquareXTwitter } from "react-icons/fa6";
import { FaGithub } from "react-icons/fa";
import logo from "../assets/foodloverlogo.png";

const Footer = () => {
  return (
    <footer className="bg-gray-50 border-t border-gray-200 mt-16">
      <div className="max-w-7xl mx-auto px-6 py-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
        {/* Logo & Description */}
        <div>
          <Link to="/" className="flex items-center gap-2 mb-3">
            <img src={logo} alt="Food Lovers" className="h-8 w-8" />
            <h2 className="text-xl font-semibold text-green-600">Food Lovers</h2>
          </Link>
          <p className="text-gray-600">
            Discover, share, and celebrate local food experiences.  
            Join our community of food lovers today!
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-lg font-semibold text-gray-800 mb-3">Quick Links</h3>
          <ul className="space-y-2 text-gray-600">
            <li>
              <Link to="/" className="hover:text-green-600 transition">Home</Link>
            </li>
            <li>
              <Link to="/allReviews" className="hover:text-green-600 transition">All Reviews</Link>
            </li>
          </ul>
        </div>

        {/* Support */}
        <div>
          <h3 className="text-lg font-semibold text-gray-800 mb-3">Support</h3>
          <ul className="space-y-2 text-gray-600">
            <li>
              <a href="#" className="hover:text-green-600 transition">Help Center</a>
            </li>
            <li>
              <a href="#" className="hover:text-green-600 transition">Privacy Policy</a>
            </li>
          </ul>
        </div>

        {/* Social Media */}
        <div>
          <h3 className="text-lg font-semibold text-gray-800 mb-3">Follow Us</h3>
          <div className="flex gap-4 text-2xl text-gray-600">
            <a href="https://facebook.com" target="_blank" rel="noreferrer" className="hover:text-blue-600 transition">
              <AiFillFacebook />
            </a>
            <a href="https://instagram.com" target="_blank" rel="noreferrer" className="hover:text-pink-500 transition">
              <AiFillInstagram />
            </a>
            <a href="https://twitter.com" target="_blank" rel="noreferrer" className="hover:text-sky-500 transition">
              <FaSquareXTwitter />
            </a>
            <a href="https://github.com" target="_blank" rel="noreferrer" className="hover:text-gray-800 transition">
              <FaGithub />
            </a>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-gray-200 py-4 text-center text-sm text-gray-600 bg-gray-100">
        © {new Date().getFullYear()} Food Lovers. All Rights Reserved.
      </div>
    </footer>
  );
};

export default Footer;
