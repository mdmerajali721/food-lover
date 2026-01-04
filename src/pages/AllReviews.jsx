import React, { useState, useEffect } from "react";
import { AiOutlineSearch } from "react-icons/ai";
import ReviewCard from "../components/ReviewCard/ReviewCard";

const AllReviews = () => {
  const [reviews, setReviews] = useState([]);
  const [search, setSearch] = useState("");

  // Fetch reviews
  const fetchReviews = async () => {
    try {
      const page = 1;
      const limit = 50;

      const url = `${
        import.meta.env.VITE_API_URL
      }/reviews?search=${encodeURIComponent(
        search
      )}&page=${page}&limit=${limit}`;

      const res = await fetch(url);
      if (!res.ok) throw new Error("Failed to fetch reviews");

      const data = await res.json();
      setReviews(data.reviews || []);
    } catch (err) {
      console.error(err);
      setReviews([]);
    }
  };

  // Initial load
  useEffect(() => {
    fetchReviews();
  }, []);

  // Auto search
  useEffect(() => {
    const timer = setTimeout(fetchReviews, 300);
    return () => clearTimeout(timer);
  }, [search]);

  const textStyle =
    "text-3xl font-bold mb-6 text-center max-w-xs mx-auto border-b-2 border-green-500 bg-gradient-to-r from-green-500 to-emerald-600 bg-clip-text text-transparent";

  return (
    <div className="max-w-7xl mx-auto px-4 mt-8 min-h-screen">
      <h1 className={textStyle}>All Reviews</h1>

      {/* Search */}
      <div className="flex justify-center mb-8">
        <div className="relative w-full max-w-md">
          <AiOutlineSearch className="absolute text-lg left-4 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search food (pizza, burger...)"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-12 pr-4 py-3 rounded border border-gray-300 focus:outline-none focus:ring-1 focus:ring-green-600"
          />
        </div>
      </div>

      {/* Grid */}
      {reviews.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {reviews.map((review) => (
            <ReviewCard key={review._id} review={review} />
          ))}
        </div>
      ) : (
        <div className="text-center py-20 text-gray-400">
          No reviews found for "{search}"
        </div>
      )}
    </div>
  );
};

export default AllReviews;
