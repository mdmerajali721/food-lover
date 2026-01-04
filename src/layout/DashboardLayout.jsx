import { NavLink, Outlet, useNavigate } from "react-router";
import { useState } from "react";
import {
  FaBars,
  FaPlusCircle,
  FaListAlt,
  FaHeart,
  FaArrowLeft,
  FaTimes,
} from "react-icons/fa";
import { RiUserReceivedFill } from "react-icons/ri";
import { useAuth } from "../context/AuthContext";
import Logo from "../components/Logo/Logo";
import ThemeToggle from "../components/ThemeToggle/ThemeToggle";
import "animate.css";
import { AiOutlineHome } from "react-icons/ai";

const DashboardLayout = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  const baseLink =
    "flex items-center gap-2 px-4 py-2 rounded font-semibold transition-all duration-300 animate__animated animate__fadeInLeft";
  const activeLink =
    "text-white bg-gradient-to-r from-green-500 to-emerald-600 shadow-md";
  const inactiveLink = "hover:text-green-500";

  const handleLogout = async () => {
    try {
      await logout(); 
      navigate("/login", { replace: true });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="flex min-h-screen bg-base-200">
      {/* MOBILE OVERLAY */}
      {open && (
        <div
          className="fixed inset-0 z-40 bg-black/30 lg:hidden"
          onClick={() => setOpen(false)}
        />
      )}

      {/* FIXED SIDEBAR */}
      <aside
        className={`fixed top-0 left-0 h-full w-72 bg-base-100 shadow-xl z-50
          transform ${
            open ? "translate-x-0" : "-translate-x-full"
          } lg:translate-x-0
          transition-transform duration-300 flex flex-col`}
      >
        {/* LOGO & CLOSE BUTTON */}
        <div className="flex items-center gap-3 px-6 py-5">
          <Logo />
          <button
            className="lg:hidden ml-auto text-xl text-slate-500"
            onClick={() => setOpen(false)}
          >
            <FaTimes />
          </button>
        </div>

        {/* NAV LINKS */}
        <nav className="px-4 py-6 space-y-2 overflow-y-auto flex-1">
          <NavLink to="/" className={`${baseLink} ${inactiveLink} border mb-4`}>
            <FaArrowLeft /> Exit Dashboard
          </NavLink>

          <NavLink
            to="/dashboard"
            end
            className={({ isActive }) =>
              `${baseLink} ${isActive ? activeLink : inactiveLink}`
            }
          >
            <AiOutlineHome /> Dashboard Home
          </NavLink>

          <NavLink
            to="/dashboard/add-review"
            className={({ isActive }) =>
              `${baseLink} ${isActive ? activeLink : inactiveLink}`
            }
          >
            <FaPlusCircle /> Add Review
          </NavLink>

          <NavLink
            to="/dashboard/my-reviews"
            className={({ isActive }) =>
              `${baseLink} ${isActive ? activeLink : inactiveLink}`
            }
          >
            <FaListAlt /> My Reviews
          </NavLink>

          <NavLink
            to="/dashboard/my-favorites"
            className={({ isActive }) =>
              `${baseLink} ${isActive ? activeLink : inactiveLink}`
            }
          >
            <FaHeart /> My Favorites
          </NavLink>
        </nav>

        {/* USER INFO & LOGOUT */}
        <div className="p-4 border-t bg-base-200">
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 px-4 py-2 text-red-500 hover:bg-red-100 rounded w-full"
          >
            <RiUserReceivedFill /> Logout
          </button>
        </div>
      </aside>

      {/* MAIN CONTENT */}
      <div className="flex-1 flex flex-col min-h-screen ml-0 lg:ml-72">
        {/* TOP BAR */}
        <header className="sticky top-0 z-30 bg-base-100 shadow px-6 py-4 flex justify-between items-center">
          <div className="flex items-center gap-4">
            <button
              className="lg:hidden text-2xl text-green-600"
              onClick={() => setOpen(true)}
            >
              <FaBars />
            </button>
            <h1 className="text-lg font-bold text-green-500">
              Dashboard Overview
            </h1>
          </div>

          <div className="flex items-center gap-3">
            <ThemeToggle />
            <img
              src={user?.photoURL || "/avator.jpg"}
              className="w-10 h-10 rounded-full border-2 border-green-600 cursor-pointer hover:scale-110 transition"
            />
          </div>
        </header>

        {/* SCROLLABLE CONTENT */}
        <main className="flex-1 p-4 md:p-8 overflow-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;