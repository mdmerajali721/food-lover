import React, { useState } from "react";
import { AiFillStar, AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import {
  HiOutlineLocationMarker,
  HiOutlineUserCircle,
  HiOutlineCalendar,
} from "react-icons/hi";
import { RiLoader4Line } from "react-icons/ri";
import { useAuth } from "../../context/AuthContext";
import { toast } from "react-hot-toast";
import Modal from "../Modal/Modal";


const buttonStyle =
  "mx-auto w-full py-3 cursor-pointer rounded font-bold text-white bg-gradient-to-r from-green-500 to-emerald-600 hover:from-emerald-600 hover:to-green-500 shadow-md transition-all duration-300 flex justify-center items-center gap-2";

const ReviewCard = ({ review }) => {
  const [isFavorite, setIsFavorite] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLiking, setIsLiking] = useState(false);
  const { user } = useAuth();

  const handleFavorite = async (e) => {
    e.stopPropagation();
    if (!user) return toast.error("Please log in first!");
    if (isFavorite || isLiking) return;

    setIsLiking(true);
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/favorites`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          reviewId: review._id,
          userEmail: user.email,
        }),
      });

      if (res.ok) {
        setIsFavorite(true);
        toast.success("Added to Favorites ❤️");
      } else {
        const err = await res.json();
        toast.error(err.message || "Already added");
      }
    } catch {
      toast.error("Failed to add favorite!");
    } finally {
      setIsLiking(false);
    }
  };

  return (
    <>
      {/* Card */}
      <article
        onClick={() => setIsModalOpen(true)}
        className="group relative flex flex-col h-full cursor-pointer overflow-hidden rounded shadow-lg hover:shadow-2xl hover:-translate-y-1 transition-all duration-300"
      >
        {/* Image Section */}
        <div className="relative h-60 overflow-hidden">
          <img
            src={review.foodImage}
            alt={review.foodName}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          />

          {/* Image Overlay Gradient on Hover */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/25 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

          {/* Rating Tag */}
          <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-md px-2 py-1 rounded-lg flex items-center gap-1 shadow-sm border border-white/20">
            <AiFillStar className="text-yellow-500" />
            <span className="text-sm font-bold text-slate-800">
              {review.rating}
            </span>
          </div>

          {/* Favorite Button */}
          <button
            onClick={handleFavorite}
            disabled={isLiking}
            className="absolute top-3 right-3 p-2 rounded-full bg-white/90 backdrop-blur-md shadow-md hover:ring-2 hover:ring-red-500 transition-all"
          >
            {isLiking ? (
              <RiLoader4Line className="animate-spin text-green-600 text-xl scale-110" />
            ) : isFavorite ? (
              <AiFillHeart className="text-red-500 text-xl" />
            ) : (
              <AiOutlineHeart className="text-slate-400 hover:text-red-500 text-xl transition-colors" />
            )}
          </button>
        </div>

        {/* Content Section */}
        <div className="flex flex-1 flex-col p-5">
          <div className="mb-4">
            <h3 className="text-xl font-bold mb-1 line-clamp-1 group-hover:text-green-600 transition-colors duration-300">
              {review.foodName}
            </h3>

            <div className="space-y-1.5">
              <div className="flex items-center gap-1.5 text-gray-500 text-sm truncate">
                <HiOutlineLocationMarker className="text-green-600 shrink-0" />
                <span>
                  {review.restaurantName} - {review.restaurantLocation}
                </span>
              </div>

              {review.userName && (
                <div className="flex items-center gap-1.5 text-slate-400 text-xs">
                  <HiOutlineUserCircle className="shrink-0" />
                  <span>By {review.userName}</span>
                </div>
              )}
            </div>
          </div>

          {/* View Details Button */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              setIsModalOpen(true);
            }}
            className={buttonStyle}
          >
            View Details
          </button>
        </div>
      </article>

      {/* Modal */}
      {isModalOpen && (
        <Modal onClose={() => setIsModalOpen(false)}>
          <div className="p-0 max-h-[90vh] overflow-y-auto scrollbar-hide bg-white rounded flex flex-col shadow-2xl">
            {/* Hero Image Section */}
            <div className="relative h-80 w-full rounded-t overflow-hidden">
              <img
                src={review.foodImage}
                alt={review.foodName}
                className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
              />
              {/* Gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />

              {/* Food Name & Location */}
              <div className="absolute bottom-6 left-6 text-white">
                <h2 className="text-3xl md:text-4xl font-bold drop-shadow-lg">
                  {review.foodName}
                </h2>
                <p className="flex items-center gap-2 text-sm md:text-base opacity-90 drop-shadow-md">
                  <HiOutlineLocationMarker className="text-emerald-400" />
                  {review.restaurantName} - {review.restaurantLocation}
                </p>
              </div>

              {/* Rating Badge */}
              <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-md px-3 py-1 rounded-lg flex items-center gap-1 shadow-md border border-white/20">
                <AiFillStar className="text-yellow-500" />
                <span className="text-sm font-bold text-slate-800">
                  {review.rating}
                </span>
              </div>

              {/* Date Badge */}
              <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-md px-3 py-1 rounded-lg flex items-center gap-1 shadow-md border border-white/20 text-slate-800 text-sm">
                <HiOutlineCalendar className="text-green-600" />
                {new Date(review.createdAt).toLocaleDateString("en-GB", {
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                })}
              </div>
            </div>

            {/* Content Section */}
            <div className="p-6 flex-1 flex flex-col gap-4">
              {/* Review Text */}
              <div className="bg-slate-50 p-2 rounded shadow-inner">
                <h4 className="text-xs font-semibold text-slate-400 mb-1">
                  Review
                </h4>
                <p className="text-green-500 italic">"{review.reviewText}"</p>
              </div>

              {/* Reviewer Info */}
              <div>
                {/* Reviewer */}
                <div className="flex flex-col items-start gap-3">
                  <div>
                    <p className="text-xs text-slate-400 font-medium">
                      Reviewer Name
                    </p>
                    <p className="text-green-500">{review.userName}</p>
                  </div>

                  <div>
                    <p className="text-xs text-slate-400 font-medium">
                      Contact Email
                    </p>
                    <p className="text-green-500">{review.userEmail}</p>
                  </div>
                </div>
              </div>

              {/* Close Button */}
              <button
                onClick={() => setIsModalOpen(false)}
                className={buttonStyle}
              >
                Close Preview
              </button>
            </div>
          </div>
        </Modal>
      )}
    </>
  );
};

export default ReviewCard;
