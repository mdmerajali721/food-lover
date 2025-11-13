import React, { useState } from "react";
import { Link, NavLink } from "react-router";
import { useAuth } from "../context/AuthContext";
import { HiMenu, HiX } from "react-icons/hi";
import { AiOutlineHome } from "react-icons/ai";
import {
  RiUserHeartFill,
  RiUserSharedFill,
  RiUserReceivedFill,
  RiUserStarFill,
} from "react-icons/ri";
import { PiListStarFill } from "react-icons/pi";
import { toast } from "react-hot-toast";
import logo from "../assets/foodloverlogo.png";
import "animate.css";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [profileMenuOpen, setProfileMenuOpen] = useState(false);
  const { user, logout } = useAuth();

  const liLinkStyle =
    "flex items-center gap-2 px-4 py-2 rounded transition hover:bg-green-50 text-gray-700";

  const handleLogout = async () => {
    try {
      await logout();
      setProfileMenuOpen(false);
      setMenuOpen(false);
      
    } catch (error) {
      toast.error("Failed to logout!");
      console.error(error);
    }
  };

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
    if (!menuOpen) setProfileMenuOpen(false);
  };

  const toggleProfileMenu = () => {
    setProfileMenuOpen(!profileMenuOpen);
    if (!profileMenuOpen) setMenuOpen(false);
  };

  const closeMenu = () => setMenuOpen(false);
  const closeProfileMenu = () => setProfileMenuOpen(false);

  return (
    <nav className="bg-white shadow-md fixed w-full z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            <img src={logo} alt="Food Lovers" className="h-8 w-8" />
            <span className="font-semibold text-2xl text-green-600">
              Food Lovers
            </span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-4">
            <NavLink
              to="/"
              className={({ isActive }) =>
                `${liLinkStyle} ${isActive ? "bg-green-100 text-green-600" : ""}`
              }
            >
              <AiOutlineHome /> Home
            </NavLink>
            <NavLink
              to="/allReviews"
              className={({ isActive }) =>
                `${liLinkStyle} ${isActive ? "bg-green-100 text-green-600" : ""}`
              }
            >
              <PiListStarFill /> All Reviews
            </NavLink>
            {user && (
              <NavLink
                to="/add-review"
                className={({ isActive }) =>
                  `${liLinkStyle} ${isActive ? "bg-green-100 text-green-600" : ""}`
                }
              >
                <RiUserStarFill /> Add Review
              </NavLink>
            )}
          </div>

          {/* Desktop Profile */}
          <div className="hidden md:flex items-center gap-2 relative">
            {!user ? (
              <Link
                to="/login"
                className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition flex items-center gap-1"
              >
                <RiUserSharedFill /> Login
              </Link>
            ) : (
              <div className="relative">
                <img
                  src={user.photoURL || "https://i.ibb.co/KzfQRnwL/avatar.png"}
                  alt="User Avatar"
                  className="h-10 w-10 rounded-full cursor-pointer border-2 border-green-600"
                  onClick={toggleProfileMenu}
                />
                {profileMenuOpen && (
                  <div className="absolute right-0 mt-2 w-52 bg-white shadow-lg rounded-md overflow-hidden border border-gray-200 animate__animated animate__fadeIn">
                    <Link
                      to="/my-reviews"
                      className={liLinkStyle}
                      onClick={closeProfileMenu}
                    >
                      <RiUserStarFill /> My Reviews
                    </Link>
                    <Link
                      to="/my-favorites"
                      className={liLinkStyle}
                      onClick={closeProfileMenu}
                    >
                      <RiUserHeartFill /> My Favorites
                    </Link>
                    <button
                      onClick={handleLogout}
                      className={`${liLinkStyle} w-full text-left`}
                    >
                      <RiUserReceivedFill /> Logout
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Mobile Controls */}
          <div className="md:hidden flex items-center gap-2 relative">
            {user && (
              <img
                src={user.photoURL || "https://i.ibb.co/KzfQRnwL/avatar.png"}
                alt="User Avatar"
                className="h-10 w-10 rounded-full cursor-pointer border-2 border-green-600"
                onClick={toggleProfileMenu}
              />
            )}
            <button
              onClick={toggleMenu}
              className="text-green-600 text-2xl"
              aria-label="Toggle Menu"
            >
              {menuOpen ? <HiX /> : <HiMenu />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && !profileMenuOpen && (
        <div className="md:hidden fixed top-16 right-0 w-64 h-screen bg-white shadow-lg border-l border-gray-200 animate__animated animate__slideInRight">
          <div className="flex flex-col px-4 py-6 gap-2">
            <NavLink
              to="/"
              className={({ isActive }) =>
                `${liLinkStyle} ${isActive ? "bg-green-100 text-green-600" : ""}`
              }
              onClick={closeMenu}
            >
              <AiOutlineHome /> Home
            </NavLink>
            <NavLink
              to="/allReviews"
              className={({ isActive }) =>
                `${liLinkStyle} ${isActive ? "bg-green-100 text-green-600" : ""}`
              }
              onClick={closeMenu}
            >
              <PiListStarFill /> All Reviews
            </NavLink>
            {user && (
              <NavLink
                to="/add-review"
                className={({ isActive }) =>
                  `${liLinkStyle} ${isActive ? "bg-green-100 text-green-600" : ""}`
                }
                onClick={closeMenu}
              >
                <RiUserStarFill /> Add Review
              </NavLink>
            )}
            {!user && (
              <Link
                to="/login"
                className="flex items-center gap-1 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition"
                onClick={closeMenu}
              >
                <RiUserSharedFill /> Login
              </Link>
            )}
          </div>
        </div>
      )}

      {/* Mobile Profile Dropdown */}
      {profileMenuOpen && (
        <div className="md:hidden fixed top-16 right-0 w-56 bg-white shadow-lg rounded-md border border-gray-200 animate__animated animate__fadeIn">
          <Link
            to="/my-reviews"
            className={liLinkStyle}
            onClick={closeProfileMenu}
          >
            <RiUserStarFill /> My Reviews
          </Link>
          <Link
            to="/my-favorites"
            className={liLinkStyle}
            onClick={closeProfileMenu}
          >
            <RiUserHeartFill /> My Favorites
          </Link>
          <button
            onClick={handleLogout}
            className={`${liLinkStyle} w-full text-left`}
          >
            <RiUserReceivedFill /> Logout
          </button>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
