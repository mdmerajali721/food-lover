import { NavLink, Outlet } from "react-router";
import { useState } from "react";
import {
  FaBars,
  FaHome,
  FaUser,
  FaPlusCircle,
  FaListAlt,
  FaHeart,
  FaSignOutAlt,
} from "react-icons/fa";
import { useAuth } from "../context/AuthContext";

const DashboardLayout = () => {
  const { user, logOut } = useAuth();
  const [open, setOpen] = useState(false);

  const linkStyle =
    "flex items-center gap-3 px-4 py-3 rounded-lg transition font-medium";
  const activeStyle = "bg-green-500 text-white shadow";
  const inactiveStyle = "text-gray-600 hover:bg-green-100";

  return (
    <div className="min-h-screen bg-base-100 flex">
      {/* Sidebar */}
      <aside
        className={`fixed lg:static z-40 top-0 left-0 h-full w-64 bg-white border-r
        transform ${open ? "translate-x-0" : "-translate-x-full"}
        lg:translate-x-0 transition-transform duration-300`}
      >
        <div className="p-6 border-b">
          <h2 className="text-2xl font-bold text-green-500">Dashboard</h2>
        </div>

        <nav className="p-4 space-y-2">
          <NavLink
            to="/dashboard"
            end
            className={({ isActive }) =>
              `${linkStyle} ${isActive ? activeStyle : inactiveStyle}`
            }
          >
            <FaHome /> Dashboard Home
          </NavLink>

          <NavLink
            to="/dashboard/profile"
            className={({ isActive }) =>
              `${linkStyle} ${isActive ? activeStyle : inactiveStyle}`
            }
          >
            <FaUser /> My Profile
          </NavLink>

          <NavLink
            to="/dashboard/add-review"
            className={({ isActive }) =>
              `${linkStyle} ${isActive ? activeStyle : inactiveStyle}`
            }
          >
            <FaPlusCircle /> Add Review
          </NavLink>

          <NavLink
            to="/dashboard/my-reviews"
            className={({ isActive }) =>
              `${linkStyle} ${isActive ? activeStyle : inactiveStyle}`
            }
          >
            <FaListAlt /> My Reviews
          </NavLink>

          <NavLink
            to="/dashboard//my-favorites"
            className={({ isActive }) =>
              `${linkStyle} ${isActive ? activeStyle : inactiveStyle}`
            }
          >
            <FaHeart /> My Favorites
          </NavLink>

          <button
            onClick={logOut}
            className="flex items-center gap-3 px-4 py-3 w-full text-left rounded-lg text-red-500 hover:bg-red-100 transition font-medium"
          >
            <FaSignOutAlt /> Logout
          </button>
        </nav>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-h-screen">
        {/* Top Navbar */}
        <header className="sticky top-0 z-30 bg-white border-b px-6 py-4 flex justify-between items-center">
          <button
            className="lg:hidden text-2xl text-gray-600"
            onClick={() => setOpen(!open)}
          >
            <FaBars />
          </button>

          <h1 className="text-xl font-semibold text-gray-700">
            Welcome, {user?.displayName || "User"}
          </h1>

          <div className="flex items-center gap-3">
            <img
              src={user?.photoURL}
              alt="User"
              className="w-10 h-10 rounded-full border"
            />
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 p-6 bg-base-200">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
