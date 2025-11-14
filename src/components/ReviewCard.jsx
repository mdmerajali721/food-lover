import React, { useState } from "react";
import {
  AiFillStar,
  AiOutlineHeart,
  AiFillHeart,
  AiOutlineClockCircle,
} from "react-icons/ai";
import { FaUser } from "react-icons/fa";
import { MdLocationOn } from "react-icons/md";
import Modal from "./Modal";
import { useAuth } from "../context/AuthContext";
import { toast } from "react-hot-toast";

const ReviewCard = ({ review }) => {
  const [isFavorite, setIsFavorite] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { user } = useAuth();

  const handleFavorite = async () => {
    if (!user) {
      toast.error("Please log in first!");
      return;
    }

    try {
      const favoriteData = {
        reviewId: review._id,
        userEmail: user.email,
      };

      const res = await fetch(`${import.meta.env.VITE_API_URL}/favorites`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(favoriteData),
      });

      if (res.ok) {
        setIsFavorite(true);
        toast.success("Added to Favorites");
      } else {
        const err = await res.json();
        toast.error(err.message || "Already in favorites or failed.");
      }
    } catch (err) {
      console.error(err);
      toast.error("Failed to add favorite!");
    }
  };

  return (
    <>
      <div className="bg-white shadow-lg rounded-2xl overflow-hidden flex flex-col hover:shadow-2xl transition transform hover:-translate-y-1">
        {/* Image */}
        <div className="overflow-hidden">
          <img
            src={review.foodImage || "https://i.ibb.co.com/3yH89bHm/noImages.jpg"}
            alt={review.foodName}
            className="w-full h-56 sm:h-64 object-cover transition-transform duration-500 hover:scale-105"
          />
        </div>

        <div className="p-5 flex flex-col flex-1">
          <h3 className="text-xl sm:text-2xl font-semibold text-gray-800">
            {review.foodName}
          </h3>

          <p className="text-gray-600 flex items-center gap-1 mt-2 text-sm sm:text-base">
            <MdLocationOn className="text-green-600" /> {review.restaurantName}
            {review.restaurantLocation && ` - ${review.restaurantLocation}`}
          </p>

          {review.userName && (
            <p className="text-gray-700 mt-1 text-sm sm:text-base flex items-center gap-1">
              <FaUser size='12' /> By {review.userName}
            </p>
          )}

          <div className="flex justify-between items-center mt-4">
            <div className="flex items-center gap-1 text-yellow-500">
              <AiFillStar /> <span>{review.rating}</span>
            </div>

            <button
              onClick={handleFavorite}
              aria-label={isFavorite ? "Remove from favorites" : "Add to favorites"}
            >
              {isFavorite ? (
                <AiFillHeart className="text-red-500 text-2xl" />
              ) : (
                <AiOutlineHeart className="text-2xl hover:text-red-500 transition" />
              )}
            </button>
          </div>

          <button
            onClick={() => setIsModalOpen(true)}
            className="mt-4 bg-green-600 text-white px-5 py-2 rounded-xl font-medium hover:bg-green-700 transition-all shadow-md hover:shadow-lg"
          >
            View Details
          </button>
        </div>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <Modal onClose={() => setIsModalOpen(false)}>
          <div className="p-4 max-h-[80vh] overflow-y-auto">
            <img
              src={review.foodImage || "https://i.ibb.co.com/3yH89bHm/noImages.jpg"}
              alt={review.foodName}
              className="w-full h-64 sm:h-80 object-cover rounded-xl"
            />
            <h2 className="text-2xl sm:text-3xl font-bold mt-4">{review.foodName}</h2>
            <p className="text-gray-600 mt-1 text-sm sm:text-base">
              {review.restaurantName}
              {review.restaurantLocation && ` - ${review.restaurantLocation}`}
            </p>
            <p className="text-gray-700 mt-3 text-sm sm:text-base">{review.reviewText}</p>
            <div className="flex items-center gap-2 mt-3 text-yellow-500">
              <AiFillStar /> <span>{review.rating}</span>
            </div>
          </div>
        </Modal>
      )}
    </>
  );
};

export default ReviewCard;
