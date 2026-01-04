import React, { useState, useRef, useEffect } from "react";
import { Link, NavLink } from "react-router";
import { useAuth } from "../../context/AuthContext";
import {
  RiMenuFoldFill,
  RiMenuFold2Fill,
  RiUserSharedFill,
  RiUserReceivedFill,
  RiUserHeartFill,
  RiUserStarFill,
} from "react-icons/ri";
import { AiOutlineHome } from "react-icons/ai";
import { PiListStarFill } from "react-icons/pi";
import { toast } from "react-hot-toast";
import "animate.css";
import Logo from "../Logo/Logo";
import ThemeToggle from "../ThemeToggle/ThemeToggle";
import { FaChalkboardUser } from "react-icons/fa6";


const Navbar = () => {
  const { user, logout } = useAuth();

  const [menuOpen, setMenuOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const profileRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (profileRef.current && !profileRef.current.contains(e.target)) {
        setProfileOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = async () => {
    try {
      await logout();
      setProfileOpen(false);
      setMenuOpen(false);
    } catch {
      toast.error("Logout failed!");
    }
  };

  const menuItems = [
    { to: "/", label: "Home", icon: <AiOutlineHome /> },
    { to: "/allReviews", label: "All Reviews", icon: <PiListStarFill /> },
  ];

  const MenuLink = ({ item, onClick, delay = 0 }) => (
    <NavLink
      to={item.to}
      onClick={onClick}
      style={{ animationDelay: `${delay}ms` }}
      className={({ isActive }) =>
        `flex items-center gap-2 px-4 py-2 font-semibold rounded transition
        animate__animated animate__fadeInRight
        ${
          isActive
            ? " py-2 cursor-pointer rounded font-bold text-white bg-gradient-to-r from-green-500 to-emerald-600 shadow-md transition-all duration-300 flex gap-2"
            : "hover:text-green-600"
        }`
      }
    >
      {item.icon}
      {item.label}
    </NavLink>
  );

  const buttonStyle =
    "mx-auto px-4 py-2 cursor-pointer rounded font-bold text-white bg-gradient-to-r from-green-500 to-emerald-600 hover:from-emerald-600 hover:to-green-500 shadow-md transition-all duration-300 flex justify-center items-center gap-2";


  return (
    <>
      {/* NAVBAR */}
      <nav className="bg-base-100 shadow-md fixed top-0 w-full z-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <Logo />

            {/* Desktop Menu */}
            <div className="hidden md:flex gap-3">
              {menuItems.map((item) => (
                <MenuLink key={item.to} item={item} />
              ))}
              {user && (
                <MenuLink
                  item={{
                    to: "/add-review",
                    label: "Add Review",
                    icon: <RiUserStarFill />,
                  }}
                />
              )}
            </div>

            {/* Right Section */}
            <div className="flex items-center gap-3">
              <ThemeToggle />

              {/* Profile */}
              {user ? (
                <div className="relative" ref={profileRef}>
                  <img
                    src={user.photoURL || "/avator.jpg"}
                    alt="User"
                    className="w-10 h-10 rounded-full border-2 border-green-600 cursor-pointer hover:scale-110 transition"
                    onClick={() => setProfileOpen(!profileOpen)}
                  />

                  {profileOpen && (
                    <div className="hidden md:block absolute right-0 mt-4 w-56 bg-base-200 rounded shadow-xl border border-base-300 animate__animated animate__fadeIn">
                      
                      <Link
                        to="/my-reviews"
                        onClick={() => setProfileOpen(false)}
                        className="flex items-center gap-2 px-4 py-3 hover:bg-base-300"
                      >
                        <RiUserStarFill /> My Reviews
                      </Link>
                      <Link
                        to="/my-favorites"
                        onClick={() => setProfileOpen(false)}
                        className="flex items-center gap-2 px-4 py-3 hover:bg-base-300"
                      >
                        <RiUserHeartFill /> My Favorites
                      </Link>
                      <button
                        onClick={handleLogout}
                        className="w-full text-left flex items-center gap-2 px-4 py-3 text-red-500 hover:bg-red-100"
                      >
                        <RiUserReceivedFill /> Logout
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <Link to="/login" className={buttonStyle}>
                  <RiUserSharedFill /> Login
                </Link>
              )}

              {/* Mobile Toggle */}
              <button
                className="md:hidden text-3xl text-green-600"
                onClick={() => setMenuOpen(!menuOpen)}
              >
                {menuOpen ? <RiMenuFold2Fill /> : <RiMenuFoldFill />}
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* BACKDROP */}
      {menuOpen && (
        <div
          className="fixed inset-0 z-40"
          onClick={() => setMenuOpen(false)}
        />
      )}

      {/* Mobile Drawer */}
      <div
        className={`md:hidden fixed top-16 right-0 h-full w-[65%] bg-base-100 shadow-2xl z-50 transition-transform duration-300 ${
          menuOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="p-4 flex flex-col gap-2">
          {menuItems.map((item, i) => (
            <MenuLink
              key={item.to}
              item={item}
              delay={i * 100}
              onClick={() => setMenuOpen(false)}
            />
          ))}

          {user ? (
            <>
              <div className="my-6 h-1 bg-green-500" />
              <MenuLink
                item={{
                  to: "/add-review",
                  label: "Add Review",
                  icon: <RiUserStarFill />,
                }}
                onClick={() => setMenuOpen(false)}
              />
              <MenuLink
                item={{
                  to: "/my-favorites",
                  label: "My Favorites",
                  icon: <RiUserHeartFill />,
                }}
                onClick={() => setMenuOpen(false)}
              />
              <button
                onClick={handleLogout}
                className="flex items-center gap-2 px-4 py-2 text-red-500 hover:bg-red-100 rounded"
              >
                <RiUserReceivedFill /> Logout
              </button>
            </>
          ) : (
            <Link
              to="/login"
              onClick={() => setMenuOpen(false)}
              className={buttonStyle}
            >
              <RiUserSharedFill /> Login
            </Link>
          )}
        </div>
      </div>
    </>
  );
};

export default Navbar;
