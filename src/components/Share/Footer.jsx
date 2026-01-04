import React from "react";
import { Link } from "react-router";
import Facebook from "/Facebook.png";
import Linkedin from "/Linkedin.png";
import Github from "/github.png"
import Logo from "../Logo/Logo";

const headingStyle =
  "inline-block text-lg font-bold mb-5 pb-1 border-b-2 border-green-500 bg-gradient-to-r from-green-500 to-emerald-600 bg-clip-text text-transparent";

const Footer = () => {
  return (
    <footer className="mt-20 bg-base-100 border-t border-base-300">
      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-6 py-14 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10">
        {/* Logo & Description */}
        <div className="space-y-3">
          <Logo />
          <p className="text-gray-500 text-sm text-justify">
            Discover, share, and celebrate local food experiences. Join our
            growing community of food lovers today!
          </p>
        </div>

        {/* Quick Links */}
        <div className=" sm:text-left">
          <h3 className={headingStyle}>Quick Links</h3>
          <ul className="space-y-3 text-gray-500 text-sm">
            <li>
              <Link
                to="/"
                className="hover:text-green-500 transition-colors duration-300"
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                to="/allReviews"
                className="hover:text-green-500 transition-colors duration-300"
              >
                All Reviews
              </Link>
            </li>
          </ul>
        </div>

        {/* Support */}
        <div className="sm:text-left">
          <h3 className={headingStyle}>Support</h3>
          <ul className="space-y-3 text-gray-500 text-sm">
            <li>
              <a href="#" className="hover:text-green-500 transition-colors">
                Help Center
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-green-500 transition-colors">
                Privacy Policy
              </a>
            </li>
          </ul>
        </div>

        {/* Social Media */}
        <div className="sm:text-left">
          <h3 className={headingStyle}>Follow Us</h3>
          <div>
            <div className="flex items-center gap-4">
              <a
                href="https://www.facebook.com/mdmerajali1790"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:scale-110 transition-transform"
              >
                <img
                  src={Facebook}
                  alt="Facebook"
                  className="w-7 h-7 rounded-sm"
                />
              </a>
              <a
                href="https://www.linkedin.com/in/mdmerajali"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:scale-110 transition-transform"
              >
                <img
                  src={Linkedin}
                  alt="LinkedIn"
                  className="w-7 h-7 rounded-sm"
                />
              </a>
              <a
                href="https://github.com/mdmerajali721"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:scale-110 transition-transform"
              >
                <img
                  src={Github}
                  alt="LinkedIn"
                  className="w-7 h-7 rounded-sm"
                />
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="bg-base-200 py-4 text-center text-sm text-gray-500">
        © {new Date().getFullYear()}{" "}
        <span className="font-semibold">Food Lovers</span>. All Rights Reserved.
      </div>
    </footer>
  );
};

export default Footer;
