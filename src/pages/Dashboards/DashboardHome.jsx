import React, { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { AiOutlineStar, AiFillHeart } from "react-icons/ai";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";

const DashboardHome = () => {
  const { user } = useAuth();
  const [reviews, setReviews] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [graphData, setGraphData] = useState([]);

  useEffect(() => {
    if (!user) return;
    fetchDashboardData();
  }, [user]);

  const fetchDashboardData = async () => {
    try {
      // Fetch Reviews
      const resReviews = await fetch(
        `${import.meta.env.VITE_API_URL}/reviews?userEmail=${user.email}`
      );
      if (!resReviews.ok) throw new Error("Failed to fetch reviews");
      const dataReviews = await resReviews.json();
      setReviews(dataReviews.reviews || []);

      // Fetch Favorites
      const resFavorites = await fetch(
        `${import.meta.env.VITE_API_URL}/favorites/${user.email}`
      );
      if (!resFavorites.ok) throw new Error("Failed to fetch favorites");
      const dataFav = await resFavorites.json();
      setFavorites(dataFav || []);

      // Prepare graph data (example: group by month)
      const months = Array.from({ length: 12 }, (_, i) => i + 1);
      const graph = months.map((m) => {
        const reviewCount = (dataReviews.reviews || []).filter(
          (r) => new Date(r.createdAt).getMonth() + 1 === m
        ).length;
        const favCount = (dataFav || []).filter(
          (f) => new Date(f.createdAt).getMonth() + 1 === m
        ).length;
        return {
          month: new Date(0, m - 1).toLocaleString("default", {
            month: "short",
          }),
          Reviews: reviewCount,
          Favorites: favCount,
        };
      });
      setGraphData(graph);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        <div className="bg-base-100 rounded shadow-2xl p-6  flex flex-col gap-4 transform transition-all">
          <h2 className="text-xl font-bold text-green-500">
            Welcome, {user?.displayName || "User"}
          </h2>
          <p className="text-gray-600">
            Manage your reviews, favorites, and profile easily from here.
          </p>
        </div>

        <div className="bg-base-100 rounded shadow-2xl p-6 flex items-center justify-between transform transition-all duration-300">
          <div>
            <p className="text-gray-500 font-medium">Total Reviews</p>
            <h3 className="text-3xl font-extrabold text-transparent bg-clip-text bg-green-500">
              {reviews.length}
            </h3>
          </div>
          <AiOutlineStar className="text-green-500 text-5xl" />
        </div>

        <div className="bg-base-100 rounded shadow-2xl p-6 flex items-center justify-between transform transition-all duration-300">
          <div>
            <p className="text-gray-500 font-medium">Favorites</p>
            <h3 className="text-3xl font-extrabold text-transparent bg-clip-text bg-green-500">
              {favorites.length}
            </h3>
          </div>
          <AiFillHeart className="text-green-500 text-5xl" />
        </div>
      </div>

      {/* Graph Section */}
      <div className="bg-base-100 rounded shadow-2xl p-6">
        <h3 className="text-lg  font-bold text-green-500 mb-4">
          Monthly Activity
        </h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart
            data={graphData}
            margin={{ top: 20, right: 20, left: 0, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis allowDecimals={false} />
            <Tooltip />
            <Bar dataKey="Reviews" fill="#22c55e" radius={[4, 4, 0, 0]} />
            <Bar dataKey="Favorites" fill="#10b981" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default DashboardHome; 