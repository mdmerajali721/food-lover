import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import Loader from "../components/Loader";
import Modal from "../components/Modal";
import { useAuth } from "../context/AuthContext";
import { toast } from "react-hot-toast";
import {
  AiFillStar,
  AiOutlineHeart,
  AiFillHeart,
  AiOutlineClockCircle,
} from "react-icons/ai";
import { MdLocationOn } from "react-icons/md";

const MyReviews = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deleteModal, setDeleteModal] = useState({ open: false, reviewId: null });
  const [favorites, setFavorites] = useState({});

  useEffect(() => {
    if (!user) {
      toast.error("You must be logged in to view your reviews.");
      navigate("/login");
      return;
    }
    fetchMyReviews();
  }, [user]);

  const fetchMyReviews = async () => {
    try {
      setLoading(true);
      const res = await fetch(
        `${import.meta.env.VITE_API_URL}/reviews?userEmail=${user.email}`
      );
      if (!res.ok) throw new Error("Failed to fetch your reviews");
      const data = await res.json();
      setReviews(data.reviews || []);
    } catch (err) {
      console.error(err);
      setReviews([]);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/reviews/${id}`, {
        method: "DELETE",
      });
      if (!res.ok) throw new Error("Failed to delete review");
      toast.success("Review deleted successfully!");
      fetchMyReviews();
    } catch (err) {
      console.error(err);
      toast.error("Failed to delete review.");
    } finally {
      setDeleteModal({ open: false, reviewId: null });
    }
  };

  const handleFavorite = async (reviewId) => {
    if (!user) {
      toast.error("Please log in first!");
      return;
    }

    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/favorites`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ reviewId, userEmail: user.email }),
      });

      if (res.ok) {
        setFavorites((prev) => ({ ...prev, [reviewId]: true }));
        toast.success("Added to Favorites");
      } else {
        const err = await res.json();
        toast.error(err.message || "Already in favorites!");
      }
    } catch (err) {
      console.error(err);
      toast.error("Failed to add favorite!");
    }
  };

  if (loading) return <Loader />;

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6 text-center text-green-600">
        My Reviews
      </h1>

      {reviews.length === 0 ? (
        <p className="text-center text-gray-500">
          You have not added any reviews yet.
        </p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {reviews.map((review) => (
            <div
              key={review._id}
              className="bg-white shadow-lg rounded-2xl overflow-hidden flex flex-col hover:shadow-2xl transition transform hover:-translate-y-1"
            >
              {/* Image */}
              <div className="overflow-hidden">
                <img
                  src={review.foodImage || "https://i.ibb.co/KzfQRnwL/avatar.png"}
                  alt={review.foodName}
                  className="w-full h-56 sm:h-64 object-cover transition-transform duration-500 hover:scale-105"
                />
              </div>

              {/* Content */}
              <div className="p-5 flex flex-col flex-1">
                <h3 className="text-xl sm:text-2xl font-semibold text-gray-800">
                  {review.foodName}
                </h3>

                <p className="text-gray-600 flex items-center gap-1 mt-2 text-sm sm:text-base">
                  <MdLocationOn className="text-green-600" /> {review.restaurantName}
                  {review.restaurantLocation && ` - ${review.restaurantLocation}`}
                </p>

                {/* Date with icon */}
                <p className="text-gray-500 text-sm mt-1 flex items-center gap-1">
                  <AiOutlineClockCircle className="text-gray-400" />
                  {new Date(review.date || review.createdAt).toLocaleDateString()}
                </p>

                {/* Rating and Favorite */}
                <div className="flex justify-between items-center mt-4">
                  <div className="flex items-center gap-1 text-yellow-500">
                    <AiFillStar /> <span>{review.rating}</span>
                  </div>

                  <button onClick={() => handleFavorite(review._id)}>
                    {favorites[review._id] ? (
                      <AiFillHeart className="text-red-500 text-2xl" />
                    ) : (
                      <AiOutlineHeart className="text-2xl hover:text-red-500 transition" />
                    )}
                  </button>
                </div>

                {/* Edit & Delete Buttons */}
                <div className="flex justify-between mt-5">
                  <button
                    onClick={() => navigate(`/edit/${review._id}`)}
                    className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
                  >
                    Edit
                  </button>

                  <button
                    onClick={() =>
                      setDeleteModal({ open: true, reviewId: review._id })
                    }
                    className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Delete Modal */}
      {deleteModal.open && (
        <Modal onClose={() => setDeleteModal({ open: false, reviewId: null })}>
          <div className="p-6">
            <h2 className="text-xl font-bold mb-4">Confirm Delete</h2>
            <p className="mb-4">Are you sure you want to delete this review?</p>

            <div className="flex justify-end gap-4">
              <button
                className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
                onClick={() => setDeleteModal({ open: false, reviewId: null })}
              >
                Cancel
              </button>

              <button
                className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
                onClick={() => handleDelete(deleteModal.reviewId)}
              >
                Confirm
              </button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
};

export default MyReviews;
