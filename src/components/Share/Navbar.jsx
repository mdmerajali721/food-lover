import React, { useState, useRef, useEffect } from "react";
import { Link, NavLink } from "react-router"
import { useAuth } from "../../context/AuthContext";
import {
  RiMenuFoldFill,
  RiMenuFold2Fill,
  RiUserSharedFill,
  RiUserReceivedFill,
} from "react-icons/ri";
import { GrContact } from "react-icons/gr";
import { RiContactsBook3Line } from "react-icons/ri";
import { FaBlogger } from "react-icons/fa6";
import { AiOutlineHome } from "react-icons/ai";
import { PiListStarFill } from "react-icons/pi";
import { RxDashboard } from "react-icons/rx";
import { toast } from "react-hot-toast";
import "animate.css";
import Logo from "../Logo/Logo";
import ThemeToggle from "../ThemeToggle/ThemeToggle";

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
      toast.success("Logged out successfully");
      setProfileOpen(false);
      setMenuOpen(false);
    } catch {
      toast.error("Logout failed!");
    }
  };

  const menuItems = [
    { to: "/", label: "Home", icon: <AiOutlineHome /> },
    { to: "/allReviews", label: "All Reviews", icon: <PiListStarFill /> },
    { to: "/about", label: "About", icon: <GrContact /> },
    { to: "/contact", label: "Contact", icon: <RiContactsBook3Line /> },
    { to: "/blog", label: "Blog", icon: <FaBlogger /> },
  ];

  const MenuLink = ({ item, onClick, delay = 0 }) => (
    <NavLink
      to={item.to}
      onClick={onClick}
      style={{ animationDelay: `${delay}ms` }}
      className={({ isActive }) =>
        `flex items-center gap-2 px-4 py-2 rounded font-semibold
         animate__animated animate__fadeInRight transition-all duration-300
        ${
          isActive
            ? "text-white bg-gradient-to-r from-green-500 to-emerald-600 shadow-md"
            : "hover:text-green-600"
        }`
      }
    >
      {item.icon}
      {item.label}
    </NavLink>
  );

  const buttonStyle =
    "px-4 py-2 rounded font-bold text-white bg-gradient-to-r from-green-500 to-emerald-600 hover:from-emerald-600 hover:to-green-500 shadow-md transition-all duration-300 flex items-center gap-2";

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
            </div>

            {/* Right Section */}
            <div className="flex items-center gap-3">
              <ThemeToggle />

              {/* Profile / Login */}
              {user ? (
                <div className="relative hidden md:block" ref={profileRef}>
                  <img
                    src={user.photoURL || "/avator.jpg"}
                    alt="User"
                    className="w-10 h-10 rounded-full border-2 border-green-600 cursor-pointer hover:scale-110 transition"
                    onClick={() => setProfileOpen(!profileOpen)}
                  />

                  {profileOpen && (
                    <div className="absolute right-0 mt-4 w-56 bg-base-200 rounded shadow-xl animate__animated animate__fadeIn">
                      <Link
                        to="/dashboard"
                        onClick={() => setProfileOpen(false)}
                        className="flex items-center gap-2 px-4 py-3 hover:bg-base-300"
                      >
                        <RxDashboard /> Dashboard
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
                /* Desktop only login */
                <Link to="/login" className={`${buttonStyle} hidden md:flex`}>
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
          className="fixed inset-0 z-40 bg-black/30"
          onClick={() => setMenuOpen(false)}
        />
      )}

      {/* Mobile Drawer */}
      <div
        className={`md:hidden fixed top-16 right-0 h-full w-[70%] bg-base-100 shadow-2xl z-50 transition-transform duration-300 ${
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

          <div className="my-4 h-0.5 bg-green-500" />

          {user ? (
            <>
              <MenuLink
                item={{
                  to: "/dashboard",
                  label: "Dashboard",
                  icon: <RxDashboard />,
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
            /* Mobile Login */
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
