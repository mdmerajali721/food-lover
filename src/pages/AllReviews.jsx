import React, { useState, useEffect } from "react";
import ReviewCard from "../components/ReviewCard";
import Loader from "../components/Loader";
import Modal from "../components/Modal";
import { AiFillStar, AiOutlineClockCircle, AiOutlineSearch } from "react-icons/ai";
import { MdLocationOn } from "react-icons/md";

const AllReviews = () => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedReview, setSelectedReview] = useState(null);
  const [search, setSearch] = useState("");

  // Debounce search input
  useEffect(() => {
    const timer = setTimeout(() => {
      fetchReviews();
    }, 300); // 500ms debounce

    return () => clearTimeout(timer);
  }, [search]);

  // Fetch reviews from backend
  const fetchReviews = async () => {
    try {
      setLoading(true);
      const page = 1;
      const limit = 50;
      const url = `${import.meta.env.VITE_API_URL}/reviews?search=${encodeURIComponent(
        search
      )}&page=${page}&limit=${limit}`;
      const res = await fetch(url);
      if (!res.ok) throw new Error("Failed to fetch reviews");
      const data = await res.json();
      setReviews(data.reviews || []);
    } catch (err) {
      console.error(err);
      setReviews([]);
    } finally {
      setLoading(false);
    }
  };

  const handleViewDetails = (review) => setSelectedReview(review);
  const handleCloseModal = () => setSelectedReview(null);

  if (loading) return <Loader />;

  return (
    <div className="container mx-auto px-4 py-10">
      <h1 className="text-3xl text-green-600 font-bold mb-6 text-center">All Reviews</h1>

      {/* Search Bar */}
      <div className="mb-6 flex justify-center">
        <div className="relative w-full max-w-md">
          <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-400">
            <AiOutlineSearch size={20} />
          </span>
          <input
            type="text"
            placeholder="Search by food name..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="border border-gray-300 rounded px-10 py-2 w-full focus:outline-none focus:border-green-600"
          />
        </div>
      </div>

      {/* Reviews Grid */}
      {reviews.length === 0 ? (
        <p className="text-center text-gray-500">No reviews found.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {reviews.map((review) => (
            <ReviewCard
              key={review._id}
              review={review}
              isFavorite={false}
              onFavorite={() => {}}
              onViewDetails={() => handleViewDetails(review)}
            />
          ))}
        </div>
      )}

      {/* Modal */}
      {selectedReview && (
        <Modal onClose={handleCloseModal}>
          <div className="p-4 max-h-[80vh] overflow-y-auto">
            <img
              src={selectedReview.foodImage || "https://i.ibb.co.com/3yH89bHm/noImages.jpg"}
              alt={selectedReview.foodName}
              className="w-full h-64 object-cover rounded"
            />
            <h2 className="text-2xl font-bold mt-4">{selectedReview.foodName}</h2>
            <p className="text-gray-600 mt-1 flex items-center gap-1">
              <MdLocationOn /> {selectedReview.restaurantName}
              {selectedReview.restaurantLocation && ` - ${selectedReview.restaurantLocation}`}
            </p>
            <p className="text-gray-700 mt-2">{selectedReview.reviewText}</p>
            <div className="flex items-center gap-2 mt-2 text-yellow-500">
              <AiFillStar /> <span>{selectedReview.rating}</span>
            </div>
            {selectedReview.userName && (
              <p className="text-gray-700 mt-2 text-sm flex items-center gap-1">
                <AiOutlineClockCircle /> By {selectedReview.userName}
              </p>
            )}
          </div>
        </Modal>
      )}
    </div>
  );
};

export default AllReviews;
