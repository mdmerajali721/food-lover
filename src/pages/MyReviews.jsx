import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { useAuth } from "../context/AuthContext";
import { toast } from "react-hot-toast";
import { AiFillStar, AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import { MdLocationOn } from "react-icons/md";
import { HiOutlineClock } from "react-icons/hi";
import Loader from "../components/Loader/Loader";
import Modal from "../components/Modal/Modal";

const buttonStyle =
  "mx-auto w-full py-3 cursor-pointer rounded font-bold text-white bg-gradient-to-r from-green-500 to-emerald-600 hover:from-emerald-600 hover:to-green-500 shadow-md transition-all duration-300 flex justify-center items-center gap-2";

const MyReviews = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deleteModal, setDeleteModal] = useState({
    open: false,
    reviewId: null,
  });
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

  if (loading)
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
        <Loader />
      </div>
    );

  const textStyle =
    "text-3xl font-bold mb-6 text-center max-w-xs mx-auto border-b-2 border-green-500 bg-gradient-to-r from-green-500 to-emerald-600 bg-clip-text text-transparent";

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className={textStyle}>My Reviews</h1>

      {reviews.length === 0 ? (
        <p className="text-center text-gray-500">
          You have not added any reviews yet.
        </p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {reviews.map((review) => (
            <article
              key={review._id}
              className="group relative mt-4 flex flex-col h-full cursor-pointer overflow-hidden rounded shadow-lg hover:shadow-2xl hover:-translate-y-1 transition-all duration-300"
            >
              {/* Image */}
              <div className="relative h-56 overflow-hidden">
                <img
                  src={review.foodImage}
                  alt={review.foodName}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />

                {/* Rating Badge */}
                <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-md px-2 py-1 rounded-lg flex items-center gap-1 shadow-sm border border-white/20">
                  <AiFillStar className="text-yellow-500" />
                  <span className="text-sm font-bold text-slate-800">
                    {review.rating}
                  </span>
                </div>

                {/* Favorite Button */}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleFavorite(review._id);
                  }}
                  className="absolute top-3 right-3 p-2 rounded-full bg-white/90 backdrop-blur-md shadow-md hover:ring-2 hover:ring-red-500 transition-all"
                >
                  {favorites[review._id] ? (
                    <AiFillHeart className="text-red-500 text-xl" />
                  ) : (
                    <AiOutlineHeart className="text-slate-400 hover:text-red-500 text-xl transition-colors" />
                  )}
                </button>
              </div>

              {/* Content */}
              <div className="flex-1 flex flex-col p-5">
                <h3 className="text-xl font-bold mb-1 line-clamp-1 group-hover:text-green-600 transition-colors">
                  {review.foodName}
                </h3>

                <p className="flex items-center gap-1.5 text-gray-500 text-sm truncate mb-2">
                  <MdLocationOn className="text-green-600 shrink-0" />
                  {review.restaurantName}{" "}
                  {review.restaurantLocation &&
                    `- ${review.restaurantLocation}`}
                </p>

                <p className="flex items-center gap-1 text-gray-400 text-xs mb-4">
                  <HiOutlineClock className="text-gray-400" />
                  {new Date(review.createdAt).toLocaleDateString("en-GB", {
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                  })}
                </p>

                {/* Buttons */}
                <div className="flex justify-between gap-2 mt-auto">
                  <button
                    onClick={() => navigate(`/edit/${review._id}`)}
                    className={buttonStyle + " bg-blue-600 hover:bg-blue-700"}
                  >
                    Edit
                  </button>

                  <button
                    onClick={() =>
                      setDeleteModal({ open: true, reviewId: review._id })
                    }
                    className={buttonStyle + " bg-red-600 hover:bg-red-700"}
                  >
                    Delete
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>
      )}

      {/* Delete Modal */}
      {deleteModal.open && (
        <Modal onClose={() => setDeleteModal({ open: false, reviewId: null })}>
          <div className="p-6 text-center max-w-sm mx-auto">
            <h2 className="text-2xl font-bold mb-3 text-gray-800">
              Confirm Delete
            </h2>
            <p className="text-gray-600 mb-6">
              Are you sure you want to delete this review? This action cannot be
              undone.
            </p>

            <div className="flex justify-center gap-4">
              <button
                onClick={() => setDeleteModal({ open: false, reviewId: null })}
                className="px-5 py-2 rounded font-bold bg-gray-300 text-gray-700 hover:bg-gray-400 transition"
              >
                Cancel
              </button>

              <button
                onClick={() => handleDelete(deleteModal.reviewId)}
                className="px-5 py-2 rounded bg-gradient-to-r from-red-500 to-red-600 text-white font-bold hover:from-red-600 hover:to-red-700 transition"
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
